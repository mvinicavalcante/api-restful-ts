import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRoute = Router();
const usersController = new UsersController();

//Rota sendo verificada a respeito da sessão (token) do usuário para chamar o controller
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
