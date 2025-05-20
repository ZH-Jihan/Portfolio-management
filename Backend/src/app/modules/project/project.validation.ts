import { z } from 'zod';

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  liveLink: z.string(),
  gitLink: z.string().optional(),
  technologies: z.array(z.string()),
  imageUrl: z.string().optional(),
  otherLinks: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
});
