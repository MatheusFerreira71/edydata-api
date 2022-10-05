import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { secret, expiresIn } from '../../../config/auth';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../../../shared/providers/hashProvider/model/IHashProvider';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse extends User {
  token: string;
}
export default class AuthenticateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('ERRO: E-mail ou senha incorretos', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('ERRO: E-mail ou senha incorretos', 401);
    }

    const token = sign({}, secret, {
      subject: `${user.id}`,
      expiresIn,
    });
    return { ...user, token };
  }
}
