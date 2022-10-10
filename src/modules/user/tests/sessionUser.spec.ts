import { User } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import BCryptHashProvider from '../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../infra/database/UserRepository';
import AuthenticateUserService, {
  AuthenticatedUser,
} from '../services/SessionUserService';

describe('Authenticate User', () => {
  const userRepo = new UserRepository();
  const hashProvider = new BCryptHashProvider();
  const authenticate = new AuthenticateUserService(userRepo, hashProvider);
  let user: User;
  let authenticatedUser: AuthenticatedUser;

  beforeEach(async () => {
    user = await userRepo.create({
      email: 'teste@hotmail.com',
      name: 'Usuário Teste',
      password: await hashProvider.generateHash('senhaTeste'),
    });
  });

  afterEach(async () => {
    await userRepo.delete(user.id);
  });

  it('should be able to authenticate the user', async () => {
    authenticatedUser = await authenticate.execute({
      email: 'teste@hotmail.com',
      password: 'senhaTeste',
    });

    expect(authenticatedUser).toBeDefined();
  });

  it('should fail it with wrong email', async () => {
    await expect(
      authenticate.execute({
        email: 'umemailquenãoexiste@hotmail.com',
        password: 'senhaTest',
      }),
    ).rejects.toThrow('ERRO: E-mail ou senha incorretos');
  });

  it('should fail it with wrong id', async () => {
    await expect(
      authenticate.execute({
        email: 'teste@hotmail.com',
        password: 'senhaQuenaoeadele',
      }),
    ).rejects.toThrow('ERRO: E-mail ou senha incorretos');
  });
});
