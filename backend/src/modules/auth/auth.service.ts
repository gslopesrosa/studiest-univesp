import { prisma } from "../../database/prisma";
import { AppError } from "../../utils/appError";
import { hashPassword, comparePassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";
import { RegisterInput, LoginInput } from "./auth.schemas";

export async function register(data: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new AppError("E-mail já cadastrado", 409);
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  const token = signToken({ sub: user.id, email: user.email });

  return { user, token };
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("Credenciais inválidas", 401);
  }

  const valid = await comparePassword(data.password, user.passwordHash);

  if (!valid) {
    throw new AppError("Credenciais inválidas", 401);
  }

  const token = signToken({ sub: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

export async function me(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId  },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      avatarUrl: true,

      subjects: {
        select: {
          id: true,
        },
      },

      studySessions: {
        select: {
          id: true,
          durationMinutes: true,
        },
      },
    },
  });

  if (!user) throw new AppError("Usuário não encontrado", 404);

 const totalStudyMinutes = user.studySessions.reduce(
    (acc: number, session: any) => acc + session.durationMinutes,
    0
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    avatarUrl: user.avatarUrl,

    stats: {
      totalStudyMinutes,
      totalSessions: user.studySessions.length,
      subjectsCount: user.subjects.length,
    },
  };
}

export async function updateMe(
  userId: string,
  data: {
    name?: string;
    email?: string;
  },
) {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name: data.name,
      email: data.email,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

export async function uploadAvatar(
  userId: string,
  avatarUrl: string,
) {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      avatarUrl,
    },

    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
    },
  });

  return user;
}
