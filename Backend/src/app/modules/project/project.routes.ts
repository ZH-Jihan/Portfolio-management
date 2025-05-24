import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/uploadImgToCloudinary';
import validateRequestData from '../../middlewares/validateRequestData';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from './project.controller';
import { ProjectSchema } from './project.validation';

const router = Router();

// Get all project & Create a new blog
router
  .route('/')
  .get(getAllProjects)
  .post(
    auth('admin'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body?.data);
      console.log(req.body);
      next();
    },
    validateRequestData(ProjectSchema),
    createProject,
  );

// Get project by ID & Update & Delete
router
  .route('/:id')
  .get(getProjectById)
  .put(
    auth('admin'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body?.data);
      next();
    },
    validateRequestData(ProjectSchema),
    updateProject,
  )
  .delete(auth('admin'), deleteProject);

export const ProjectRoutes = router;
