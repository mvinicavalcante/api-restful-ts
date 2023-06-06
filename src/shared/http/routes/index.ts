import productsRouter from '@modules/products/routes/products.routes';
import usersRoute from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

//Aqui ele pega todas as rotas definidas em productsRouter e joga elas depois do "/products"
routes.use('/products', productsRouter);
routes.use('/users', usersRoute);

export default routes;
