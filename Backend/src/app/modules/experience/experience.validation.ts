import { z } from "zod";

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.union([z.date(), z.string()]), // Date or "Present"
  responsibilties: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});