import { Request, Response, NextFunction } from "express";
import * as dashboardService from "./dashboard.service";
import { calendarQuerySchema, rankingQuerySchema } from "./dashboard.schemas";

export async function streak(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await dashboardService.getStreak(req.userId!);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function calendar(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { year, month } = calendarQuerySchema.parse(req.query);
    const data = await dashboardService.getCalendar(req.userId!, year, month);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function subjectsRanking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = rankingQuerySchema.parse(req.query);
    const data = await dashboardService.getSubjectsRanking(req.userId!, query);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function summary(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await dashboardService.getSummary(req.userId!);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
