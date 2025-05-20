import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequestData from '../../middlewares/validateRequestData';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from './blog.controller';
import { BlogSchema } from './blog.validation';

const router = Router();

// Get all blogs & Create a new blog
router
  .route('/')
  .get(getAllBlogs)
  .post(auth('admin'), validateRequestData(BlogSchema), createBlog);

// Get blog by ID & Update & Delete
router
  .route('/:id')
  .get(getBlogById)
  .put(auth('admin'), validateRequestData(BlogSchema), updateBlog)
  .delete(auth('admin'), deleteBlog);

export const BlogRoutes = router;
