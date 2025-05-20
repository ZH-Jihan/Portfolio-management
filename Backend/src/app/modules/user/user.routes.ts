import { NextFunction, Request, Response, Router } from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/uploadImgToCloudinary';
import { getUserProfile, updateUserWonProfile } from './user.controller';

const router = Router();

router
  .route('/:id')
  .get(auth('admin'), getUserProfile)
  .put(
    auth('admin'),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body?.data);
      next();
    },
    updateUserWonProfile,
  );

export const UserRoutes = router;
