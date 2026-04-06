import { Request, Response, NextFunction } from "express";
import * as sessionsService from "./studySessions.service";
import {
  createSessionSchema,
  updateSessionSchema,
  listSessionsSchema,
} from "./studySessions.schemas";
import { AppError } from "../../utils/appError";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createSessionSchema.parse(req.body);
    const session = await sessionsService.createSession(req.userId!, data);
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = listSessionsSchema.parse(req.query);
    const result = await sessionsService.listSessions(req.userId!, filters);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await sessionsService.getSession(
      req.userId!,
      req.params.id as string,
    );
    res.json(session);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = updateSessionSchema.parse(req.body);
    const session = await sessionsService.updateSession(
      req.userId!,
      req.params.id as string,
      data,
    );
    res.json(session);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await sessionsService.deleteSession(req.userId!, req.params.id as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function uploadPhoto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) throw new AppError("Nenhum arquivo enviado", 400);

    const photo = await sessionsService.addPhoto(
      req.userId!,
      req.params.id as string,
      req.file.buffer, // ← buffer direto da memória
    );
    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
}

export async function removePhoto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await sessionsService.deletePhoto(
      req.userId!,
      req.params.id as string,
      req.params.photoId as string,
    );
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
