import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { User } from '../typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);
    //Procura o usuário a partir do email
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    //Não o encontrando, retorna esse erro 401
    const passwordConfirmed = await compare(password, user.password);
    //Compara a senha recebida e a senha que está no BD (criptografada)
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    //Se a senha não for a correta, retorna um erro
    const res = {
      user,
      token,
    };
    return res;
  }
}

export default CreateSessionService;
