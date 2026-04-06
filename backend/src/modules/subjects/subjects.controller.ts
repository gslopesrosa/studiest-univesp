import { Request, Response, NextFunction } from "express";
import * as subjectsService from "./subjects.service";
import { createSubjectSchema, updateSubjectSchema } from "./subjects.schemas";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createSubjectSchema.parse(req.body);
    const subject = await subjectsService.createSubject(req.userId!, data);
    res.status(201).json(subject);
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const subjects = await subjectsService.listSubjects(req.userId!);
    res.json(subjects);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = updateSubjectSchema.parse(req.body);
    const subject = await subjectsService.updateSubject(
      req.userId!,
      req.params.id as string,
      data,
    );
    res.json(subject);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await subjectsService.deleteSubject(req.userId!, req.params.id as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
