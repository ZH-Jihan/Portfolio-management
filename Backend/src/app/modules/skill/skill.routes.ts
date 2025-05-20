import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequestData from '../../middlewares/validateRequestData';
import { createSkill, getAllskill } from './skill.controller';
import { SkillSchema } from './skill.validation';

const router = Router();

// Get all skills & Create a new skill
router
  .route('/')
  .get(getAllskill)
  .post(auth('admin'), validateRequestData(SkillSchema), createSkill);

// Get skill by ID & Update & Delete
router
  .route('/:id')
  .get(getAllskill)
  .put(auth('admin'), validateRequestData(SkillSchema), createSkill)
  .delete(auth('admin'), getAllskill);
export const SkillRoutes = router;
