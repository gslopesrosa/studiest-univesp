import { z } from "zod";

export const calendarQuerySchema = z
  .object({
    year: z.coerce.number().int().min(2000).max(2100).optional(),
    month: z.coerce.number().int().min(1).max(12).optional(),
  })
  .transform((data) => {
    const now = new Date();
    return {
      year: data.year ?? now.getUTCFullYear(),
      month: data.month ?? now.getUTCMonth() + 1,
    };
  });

export const rankingQuerySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

export type RankingQuery = z.infer<typeof rankingQuerySchema>;
