import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { blogService } from './blog.service';

// Get all blogs
export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await blogService.getAllBlogsFromDb();
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blogs fetched successfully',
    data: blogs,
  });
});

// Get blog by ID
export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.getBlogByIdFromDb(req.params.id);
  if (!blog) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog fetched successfully',
    data: blog,
  });
});

// Create a new blog
export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.postBlogInDb(req.body);
  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    data: blog,
  });
});

// Update a blog
export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.updateBlogInDb(req.params.id, req.body);
  if (!blog) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: blog,
  });
});

// Delete a blog
export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.deleteBlogInDb(req.params.id);
  if (!blog) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: null,
  });
});
