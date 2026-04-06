import { prisma } from "../../database/prisma";
import { AppError } from "../../utils/appError";
import { CreateSubjectInput, UpdateSubjectInput } from "./subjects.schemas";

export async function createSubject(userId: string, data: CreateSubjectInput) {
  const existing = await prisma.subject.findUnique({
    where: { userId_name: { userId, name: data.name } },
  });

  if (existing) {
    throw new AppError("Você já tem uma disciplina com esse nome", 409);
  }

  return prisma.subject.create({
    data: { ...data, userId },
    select: { id: true, name: true, color: true, createdAt: true },
  });
}

export async function listSubjects(userId: string) {
  return prisma.subject.findMany({
    where: { userId },
    select: { id: true, name: true, color: true, createdAt: true },
    orderBy: { name: "asc" },
  });
}

export async function updateSubject(
  userId: string,
  subjectId: string,
  data: UpdateSubjectInput,
) {
  await assertOwnership(userId, subjectId);

  if (data.name) {
    const conflict = await prisma.subject.findFirst({
      where: {
        userId,
        name: data.name,
        NOT: { id: subjectId },
      },
    });
    if (conflict)
      throw new AppError("Você já tem uma disciplina com esse nome", 409);
  }

  return prisma.subject.update({
    where: { id: subjectId },
    data,
    select: { id: true, name: true, color: true, updatedAt: true },
  });
}

export async function deleteSubject(userId: string, subjectId: string) {
  await assertOwnership(userId, subjectId);

  await prisma.subject.delete({ where: { id: subjectId } });
}

async function assertOwnership(userId: string, subjectId: string) {
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    select: { userId: true },
  });

  if (!subject) throw new AppError("Disciplina não encontrada", 404);
  if (subject.userId !== userId) throw new AppError("Sem permissão", 403);
}
