import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRoute = Router();
const sessionsController = new SessionsController();

sessionsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

//Pelo body e n pela URL q a rota vai mudar (atributos vindo do body)

export default sessionsRoute;
