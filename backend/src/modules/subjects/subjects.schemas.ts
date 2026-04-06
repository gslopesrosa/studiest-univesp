import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(1, "Nome obrigatório").max(100),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve ser um hex válido, ex: #7C3AED")
    .optional(),
});

export const updateSubjectSchema = createSubjectSchema.partial();

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;
