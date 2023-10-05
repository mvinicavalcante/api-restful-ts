import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

//Middleware tem, pelo menos, 3 parâmetros
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization; //pega o token retornado ao iniciar session

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  //Token é composto por:
  // Bearer + token
  //Desestruturando para pegar só o token (após a posição 0)
  const [, token] = authHeader.split(' ');

  try {
    //verificar se o token foi criado no padrão definido por nós
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    //Ele verifica a validação do token e retorna o usuário após o processo
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
