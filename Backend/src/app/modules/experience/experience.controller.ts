import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { experienceService } from './experience.service';

// Get all experiences
export const getAllExperiences = asyncHandler(
  async (req: Request, res: Response) => {
    const experiences = await experienceService.getAllExperienceFromDb();
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Experiences fetched successfully',
      data: experiences,
    });
  },
);

// Get experience by ID
export const getExperienceById = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await experienceService.getExperienceByIdFromDb(
      req.params.id,
    );
    if (!experience) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Experience not found');
    }
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Experience fetched successfully',
      data: experience,
    });
  },
);

// Create a experience
export const createExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await experienceService.postExperienceInDb(req.body);
    ApiResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Experience created successfully',
      data: experience,
    });
  },
);

// Update a experience
export const updateExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await experienceService.updateExperienceInDb(
      req.params.id,
      req.body,
    );
    if (!experience) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Experience not found');
    }
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Experience updated successfully',
      data: experience,
    });
  },
);

// Delete a experience
export const deleteExperience = asyncHandler(
  async (req: Request, res: Response) => {
    const experience = await experienceService.deleteExperienceInDb(
      req.params.id,
    );
    if (!experience) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Experience not found');
    }
    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Experience deleted successfully',
      data: null,
    });
  },
);
