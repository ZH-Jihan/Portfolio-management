import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true , unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String}],
    image: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export const Blog = model<TBlog>('Blog', blogSchema);
