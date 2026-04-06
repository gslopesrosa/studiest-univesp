import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/appError";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Token não fornecido", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    throw new AppError("Token inválido ou expirado", 401);
  }
}
