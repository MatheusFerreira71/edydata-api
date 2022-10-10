import { User } from '@prisma/client';
import { afterAll, describe, expect, it } from 'vitest';

import BCryptHashProvider from '../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../infra/database/UserRepository';
import CreateUserService from '../services/CreateUserService';

describe('Create User', () => {
  const userRepo = new UserRepository();
  const hashProvider = new BCryptHashProvider();
  const createUser = new CreateUserService(userRepo, hashProvider);
  let user: User;

  afterAll(async () => {
    await userRepo.delete(user.id);
  });

  it('should be able to create a new user', async () => {
    user = await createUser.execute({
      name: 'Usuario Teste',
      email: 'teste@teste.com',
      password: 'senhaTest',
    });

    expect(user).toBeDefined();
  });

  it('should fail it with wrong password', async () => {
    await expect(
      createUser.execute({
        name: 'Usuario Teste 2',
        email: 'teste@teste.com',
        password: 'senhaTest',
      }),
    ).rejects.toThrow('ERRO: O endereço de e-mail já está sendo utilizado');
  });
});
