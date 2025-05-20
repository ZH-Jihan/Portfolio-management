import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { projectService } from './project.service';

// Get all projects
export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectService.getAllProjectsFromDb();
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Projects fetched successfully',
      data: project,
    });
  },
);

// Get project by ID
export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectService.getProjectByIdFromDb(req.params.id);
    if (!project) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Project not found');
    }
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Project fetched successfully',
      data: project,
    });
  },
);

// Create a new project
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectService.postProjectInDb(req.file, req.body);
    ApiResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Project created successfully',
      data: project,
    });
  },
);

// Update a project
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectService.updateProjectInDb(
      req.params.id,
      req.file,
      req.body,
    );
    if (!project) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Project not found');
    }
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Project updated successfully',
      data: project,
    });
  },
);

// Delete a project
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectService.deleteProjectInDb(req.params.id);
    if (!project) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Project not found');
    }
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Project deleted successfully',
      data: project,
    });
  },
);
