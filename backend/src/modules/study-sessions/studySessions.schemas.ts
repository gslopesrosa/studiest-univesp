import { z } from "zod";

const sessionBaseSchema = z.object({
  subjectId: z.uuid("subjectId inválido"),
  studyDate: z.coerce.date(),
  durationMinutes: z.number().int().min(1, "Duração deve ser maior que zero"),
  description: z.string().max(1000).optional(),
  didExercises: z.boolean().default(false),
  exerciseCount: z.number().int().min(1).optional(),
});

export const createSessionSchema = sessionBaseSchema.refine(
  (data) => !data.exerciseCount || data.didExercises,
  {
    message: "exerciseCount só pode ser informado se didExercises for true",
    path: ["exerciseCount"],
  },
);

export const updateSessionSchema = sessionBaseSchema
  .partial()
  .refine((data) => !data.exerciseCount || data.didExercises !== false, {
    message: "exerciseCount só pode ser informado se didExercises for true",
    path: ["exerciseCount"],
  });

export const listSessionsSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  subjectId: z.string().uuid().optional(),
  didExercises: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;
export type ListSessionsInput = z.infer<typeof listSessionsSchema>;
