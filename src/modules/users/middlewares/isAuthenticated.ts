import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

//Middleware tem, pelo menos, 3 parâmetros
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  //Token é composto por:
  // Bearer + token
  //Desestruturando para pegar só o token (após a posição 0)
  const [, token] = authHeader.split(' ');

  try {
    const decoderToken = verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
