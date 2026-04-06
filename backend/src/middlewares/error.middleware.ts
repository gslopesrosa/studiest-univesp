import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(422).json({
      message: "Validation error",
      issues: err.flatten().fieldErrors,
    });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}
