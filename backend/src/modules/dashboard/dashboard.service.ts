import { prisma } from "../../database/prisma";
import { RankingQuery } from "./dashboard.schemas";

export async function getStreak(userId: string) {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const rows = await prisma.studySession.findMany({
    where: {
      userId,
      studyDate: { gte: oneYearAgo },
    },
    select: { studyDate: true },
    orderBy: { studyDate: "desc" },
  });

  const days = getDistinctDays(rows.map((r) => r.studyDate));

  return {
    current: calcCurrentStreak(days),
    best: calcBestStreak(days),
    totalDays: days.length,
  };
}

// extrai dias únicos como strings "YYYY-MM-DD", ordenados desc
function getDistinctDays(dates: Date[]): string[] {
  const set = new Set(dates.map((d) => toDateString(d)));
  return Array.from(set).sort((a, b) => (a > b ? -1 : 1));
}

// streak atual: sequência contínua a partir de hoje ou ontem
function calcCurrentStreak(days: string[]): number {
  if (days.length === 0) return 0;

  const today = toDateString(new Date());
  const yesterday = toDateString(addDays(new Date(), -1));

  // se o último dia estudado não é hoje nem ontem, streak zerou
  if (days[0] !== today && days[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    const expected = toDateString(addDays(parseDate(days[i - 1]), -1));
    if (days[i] === expected) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// melhor streak histórico
function calcBestStreak(days: string[]): number {
  if (days.length === 0) return 0;

  let best = 1;
  let current = 1;

  for (let i = 1; i < days.length; i++) {
    const expected = toDateString(addDays(parseDate(days[i - 1]), -1));
    if (days[i] === expected) {
      current++;
      if (current > best) best = current;
    } else {
      current = 1;
    }
  }

  return best;
}

// helpers de data — sem bibliotecas externas
function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseDate(str: string): Date {
  return new Date(`${str}T00:00:00.000Z`);
}

export async function getCalendar(userId: string, year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1)); // primeiro dia do mês seguinte

  const sessions = await prisma.studySession.findMany({
    where: {
      userId,
      studyDate: { gte: start, lt: end },
    },
    select: {
      studyDate: true,
      durationMinutes: true,
      subjectId: true,
      subject: { select: { id: true, name: true, color: true } },
    },
  });

  return buildCalendar(sessions, year, month);
}

type SessionRow = {
  studyDate: Date;
  durationMinutes: number;
  subjectId: string;
  subject: { id: string; name: string; color: string | null };
};

function buildCalendar(sessions: SessionRow[], year: number, month: number) {
  // agrupa por dia
  const byDay = new Map<string, SessionRow[]>();

  for (const session of sessions) {
    const key = toDateString(session.studyDate);
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(session);
  }

  // monta os dias do mês
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const days = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const daySessions = byDay.get(key) ?? [];

    days.push({
      date: key,
      studied: daySessions.length > 0,
      totalMinutes: daySessions.reduce((sum, s) => sum + s.durationMinutes, 0),
      sessionCount: daySessions.length,
      mainSubject: getMainSubject(daySessions),
    });
  }

  return {
    year,
    month,
    days,
    summary: {
      studiedDays: days.filter((d) => d.studied).length,
      totalMinutes: days.reduce((sum, d) => sum + d.totalMinutes, 0),
      totalSessions: days.reduce((sum, d) => sum + d.sessionCount, 0),
    },
  };
}

// disciplina com mais minutos no dia
function getMainSubject(sessions: SessionRow[]) {
  if (sessions.length === 0) return null;

  const totals = new Map<
    string,
    { subject: SessionRow["subject"]; minutes: number }
  >();

  for (const s of sessions) {
    const entry = totals.get(s.subjectId);
    if (entry) {
      entry.minutes += s.durationMinutes;
    } else {
      totals.set(s.subjectId, {
        subject: s.subject,
        minutes: s.durationMinutes,
      });
    }
  }

  return [...totals.values()].sort((a, b) => b.minutes - a.minutes)[0].subject;
}

export async function getSubjectsRanking(userId: string, query: RankingQuery) {
  const { startDate, endDate, limit } = query;

  const grouped = await prisma.studySession.groupBy({
    by: ["subjectId"],
    where: {
      userId,
      ...(startDate || endDate
        ? {
            studyDate: {
              ...(startDate && { gte: startDate }),
              ...(endDate && { lte: endDate }),
            },
          }
        : {}),
    },
    _sum: { durationMinutes: true },
    _count: { id: true },
    orderBy: { _sum: { durationMinutes: "desc" } },
    take: limit,
  });

  if (grouped.length === 0) return [];

  // busca os dados das disciplinas em uma única query
  const subjectIds = grouped.map((g) => g.subjectId);
  const subjects = await prisma.subject.findMany({
    where: { id: { in: subjectIds } },
    select: { id: true, name: true, color: true },
  });

  const subjectMap = new Map(subjects.map((s) => [s.id, s]));

  return grouped.map((g, index) => ({
    rank: index + 1,
    subject: subjectMap.get(g.subjectId)!,
    totalMinutes: g._sum.durationMinutes ?? 0,
    totalHours: Number(((g._sum.durationMinutes ?? 0) / 60).toFixed(1)),
    sessionCount: g._count.id,
  }));
}

export async function getSummary(userId: string) {
  const now = new Date();

  const startOfWeek = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - now.getUTCDay(),
    ),
  );

  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );

  const [week, month, total] = await prisma.$transaction([
    prisma.studySession.aggregate({
      where: { userId, studyDate: { gte: startOfWeek } },
      _sum: { durationMinutes: true },
      _count: { id: true },
    }),
    prisma.studySession.aggregate({
      where: { userId, studyDate: { gte: startOfMonth } },
      _sum: { durationMinutes: true },
      _count: { id: true },
    }),
    prisma.studySession.aggregate({
      where: { userId },
      _sum: { durationMinutes: true },
      _count: { id: true },
    }),
  ]);

  const [weekDays, monthDays] = await prisma.$transaction([
    prisma.studySession.findMany({
      where: { userId, studyDate: { gte: startOfWeek } },
      select: { studyDate: true },
      distinct: ["studyDate"],
    }),
    prisma.studySession.findMany({
      where: { userId, studyDate: { gte: startOfMonth } },
      select: { studyDate: true },
      distinct: ["studyDate"],
    }),
  ]);

  return {
    week: {
      totalMinutes: week._sum.durationMinutes ?? 0,
      totalHours: Number(((week._sum.durationMinutes ?? 0) / 60).toFixed(1)),
      sessionCount: week._count.id,
      studiedDays: weekDays.length,
    },
    month: {
      totalMinutes: month._sum.durationMinutes ?? 0,
      totalHours: Number(((month._sum.durationMinutes ?? 0) / 60).toFixed(1)),
      sessionCount: month._count.id,
      studiedDays: monthDays.length,
    },
    total: {
      totalMinutes: total._sum.durationMinutes ?? 0,
      totalHours: Number(((total._sum.durationMinutes ?? 0) / 60).toFixed(1)),
      sessionCount: total._count.id,
    },
  };
}
