import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '../../shared/errors/AppError';
//Já pra puxar o typeorm quando rodar o projeto e colocar tudo pra se conectar
import '../../shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
const app = express();

app.use(cors());
app.use('/files', express.static(uploadConfig.directory)); //rota estática para acesso mais rápido do front às imagens
app.use(express.json());

//recebendo as rotas
app.use(routes);

app.use(errors());

app.use(
  cors({
    origin: '*',
  }),
);

//criar um middleware para capturar o erro e tratá-lo com o AppError
//Esse middleware possui um parâmetro a mais: o error. Justamente por ser um middleware para tratar erros
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      //verifico se tal erro é da instância de AppError
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
