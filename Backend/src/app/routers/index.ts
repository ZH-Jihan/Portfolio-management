import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { ExperienceRoutes } from '../modules/experience/experience.routes';
import { ProjectRoutes } from '../modules/project/project.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { SkillRoutes } from '../modules/skill/skill.routes';

const router = Router();

const allRoutersModel = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/experience',
    route: ExperienceRoutes,
  },
  {
    path: '/skill',
    route: SkillRoutes,
  },
];

allRoutersModel.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
