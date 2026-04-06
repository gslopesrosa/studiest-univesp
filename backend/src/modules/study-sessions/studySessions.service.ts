import path from "path";
import { prisma } from "../../database/prisma";
import { AppError } from "../../utils/appError";
import { promises as fs } from "fs";
import {
  CreateSessionInput,
  UpdateSessionInput,
  ListSessionsInput,
} from "./studySessions.schemas";

export async function createSession(userId: string, data: CreateSessionInput) {
  await assertSubjectOwnership(userId, data.subjectId);

  return prisma.studySession.create({
    data: {
      userId,
      subjectId: data.subjectId,
      studyDate: data.studyDate,
      durationMinutes: data.durationMinutes,
      description: data.description,
      didExercises: data.didExercises,
      exerciseCount: data.didExercises ? data.exerciseCount : null,
    },
    include: {
      subject: { select: { id: true, name: true, color: true } },
      photos: true,
    },
  });
}

export async function listSessions(userId: string, filters: ListSessionsInput) {
  const { startDate, endDate, subjectId, didExercises, page, limit } = filters;
  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(subjectId && { subjectId }),
    ...(didExercises !== undefined && { didExercises }),
    ...(startDate || endDate
      ? {
          studyDate: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
          },
        }
      : {}),
  };

  const [sessions, total] = await prisma.$transaction([
    prisma.studySession.findMany({
      where,
      include: {
        subject: { select: { id: true, name: true, color: true } },
        photos: { select: { id: true, imageUrl: true } },
      },
      orderBy: { studyDate: "desc" },
      skip,
      take: limit,
    }),
    prisma.studySession.count({ where }),
  ]);

  return {
    data: sessions,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getSession(userId: string, sessionId: string) {
  const session = await prisma.studySession.findUnique({
    where: { id: sessionId },
    include: {
      subject: { select: { id: true, name: true, color: true } },
      photos: { select: { id: true, imageUrl: true } },
    },
  });

  if (!session) throw new AppError("Sessão não encontrada", 404);
  if (session.userId !== userId) throw new AppError("Sem permissão", 403);

  return session;
}

export async function updateSession(
  userId: string,
  sessionId: string,
  data: UpdateSessionInput,
) {
  await assertOwnership(userId, sessionId);

  if (data.subjectId) {
    await assertSubjectOwnership(userId, data.subjectId);
  }

  return prisma.studySession.update({
    where: { id: sessionId },
    data: {
      ...data,
      exerciseCount: data.didExercises === false ? null : data.exerciseCount,
    },
    include: {
      subject: { select: { id: true, name: true, color: true } },
      photos: { select: { id: true, imageUrl: true } },
    },
  });
}

export async function deleteSession(userId: string, sessionId: string) {
  await assertOwnership(userId, sessionId);
  await prisma.studySession.delete({ where: { id: sessionId } });
}

// helpers

async function assertOwnership(userId: string, sessionId: string) {
  const session = await prisma.studySession.findUnique({
    where: { id: sessionId },
    select: { userId: true },
  });

  if (!session) throw new AppError("Sessão não encontrada", 404);
  if (session.userId !== userId) throw new AppError("Sem permissão", 403);
}

async function assertSubjectOwnership(userId: string, subjectId: string) {
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    select: { userId: true },
  });

  if (!subject) throw new AppError("Disciplina não encontrada", 404);
  if (subject.userId !== userId)
    throw new AppError("Disciplina não pertence ao usuário", 403);
}

export async function addPhoto(
  userId: string,
  sessionId: string,
  filename: string,
) {
  await assertOwnership(userId, sessionId);

  const imageUrl = `/uploads/${filename}`;

  return prisma.studySessionPhoto.create({
    data: { studySessionId: sessionId, imageUrl },
    select: { id: true, imageUrl: true, createdAt: true },
  });
}

export async function deletePhoto(
  userId: string,
  sessionId: string,
  photoId: string,
) {
  await assertOwnership(userId, sessionId);

  const photo = await prisma.studySessionPhoto.findUnique({
    where: { id: photoId },
    select: { id: true, imageUrl: true, studySessionId: true },
  });

  if (!photo) throw new AppError("Foto não encontrada", 404);
  if (photo.studySessionId !== sessionId)
    throw new AppError("Sem permissão", 403);

  const filename = path.basename(photo.imageUrl);
  const filepath = path.resolve("uploads", filename);

  await fs.unlink(filepath).catch(() => null);

  await prisma.studySessionPhoto.delete({ where: { id: photoId } });
}
