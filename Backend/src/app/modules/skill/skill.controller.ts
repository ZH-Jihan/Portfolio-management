import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { SkillService } from "./skill.service";
import ApiResponse from "../../utils/ApiResponse";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";


// Get all skills
export const getAllskill = asyncHandler(async (req: Request, res: Response) => {
  const skills = await SkillService.getAllSkillsFromDb();
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Skills fetched successfully',
    data: skills,
  });
});

// Get skill by ID
export const getSkillById = asyncHandler(async (req: Request, res: Response) => {
  const skill = await SkillService.getSkillByIdFromDb(req.params.id);
  if (!skill) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Skill not found');
  }
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Skill fetched successfully',
    data: skill,
  });
})

// Create a new skill
export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const skill = await SkillService.postSkillInDb(req.body);
  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Skill created successfully',
    data: skill,
  });
});
// Update a skill
export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const skill = await SkillService.updateSkillInDb(req.params.id, req.body);
  if (!skill) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Skill not found');
  }
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Skill updated successfully',
    data: skill,
  });
});