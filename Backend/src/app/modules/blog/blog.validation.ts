import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
  image: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});