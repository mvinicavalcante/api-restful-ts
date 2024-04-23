import productsRouter from '@modules/products/routes/products.routes';
import sessionsRoute from '@modules/users/routes/session.routes';
import usersRoute from '@modules/users/routes/users.routes';
import passwordRoute from '@modules/users/routes/password.routes';
import { Router } from 'express';

const routes = Router();

//Aqui ele pega todas as rotas definidas em productsRouter e joga elas depois do "/products"
routes.use('/products', productsRouter);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);
routes.use('/password', passwordRoute);

export default routes;
