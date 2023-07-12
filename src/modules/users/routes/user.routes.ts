import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.get('/', isAuthenticated, usersController.index);

usersRoute.get('/', usersController.index);

usersRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRoute;
