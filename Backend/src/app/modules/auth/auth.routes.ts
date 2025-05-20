import { Router } from 'express';
import validateRequestData from '../../middlewares/validateRequestData';
import { genAccessToken, loginUser, registerUser } from './auth.controller';
import { loginUserZodSchema, regUserZodSchema } from './auth.validation';

const router = Router();

router
  .route('/register')
  .post(validateRequestData(regUserZodSchema), registerUser);

router.route('/login').post(validateRequestData(loginUserZodSchema), loginUser);

router.route('/create-accessToken').post(genAccessToken);

export const AuthRoutes = router;
