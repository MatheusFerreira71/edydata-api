import { User } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import BCryptHashProvider from '../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../infra/database/UserRepository';
import UpdateUserService from '../services/UpdateUserService';

describe('Update an User', () => {
  const userRepo = new UserRepository();
  const hashProvider = new BCryptHashProvider();
  const updateUser = new UpdateUserService(userRepo);
  let user: User;

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

  it('should fail with wrong id', async () => {
    await expect(
      updateUser.execute(123812938129831, {
        name: 'Novo teste',
        email: 'novo@teste.com',
      }),
    ).rejects.toThrow('ERRO: Nenhum usuário foi encontrado.');
  });

  it('should fail if email duplicated', async () => {
    const compareUser = await userRepo.create({
      email: 'novoteste@hotmail.com',
      name: 'Usuário Teste',
      password: await hashProvider.generateHash('senhaTeste'),
    });

    await expect(
      updateUser.execute(user.id, {
        email: 'novoteste@hotmail.com',
        name: 'Novo user',
      }),
    ).rejects.toThrow('ERRO: O endereço de e-mail já está sendo utilizado');

    await userRepo.delete(compareUser.id);
  });

  it('should update an user', async () => {
    const updatedUser = await updateUser.execute(user.id, {
      email: 'roberto@yahoo.com',
      name: 'senhaTest',
    });

    expect(updatedUser).toBeDefined();
  });
});
