import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequestData from '../../middlewares/validateRequestData';
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
} from './experience.controller';
import { ExperienceSchema } from './experience.validation';
import { Experience } from './experience.model';

const router = Router();

// Get all blogs & Create a new blog
router
  .route('/')
  .get(getAllExperiences)
  .post(auth('admin'), validateRequestData(ExperienceSchema), createExperience);

// Get blog by ID & Update & Delete
router
  .route('/:id')
  .get(getExperienceById)
  .put(auth('admin'), validateRequestData(ExperienceSchema), updateExperience)
  .delete(auth('admin'), deleteExperience);

export const ExperienceRoutes = router;
