import { z } from 'zod';

export const SkillSchema = z.object({
  name: z.string(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  yearsOfExperience: z.number(),
});

export type SkillSchema = z.infer<typeof SkillSchema>;
