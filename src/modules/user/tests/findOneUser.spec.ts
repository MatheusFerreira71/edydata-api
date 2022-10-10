import { User } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import BCryptHashProvider from '../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../infra/database/UserRepository';
import FindOneUserService from '../services/FindOneUserService';

describe('Find One User', () => {
  const userRepo = new UserRepository();
  const hashProvider = new BCryptHashProvider();
  const findOne = new FindOneUserService(userRepo);
  let user: User;

  beforeEach(async () => {
    user = await userRepo.create({
      name: 'Vistest Test',
      email: 'vitest@teste.com',
      password: await hashProvider.generateHash('senhaTest'),
    });
  });

  afterEach(async () => {
    await userRepo.delete(user.id);
  });

  it('should be able to find the user', async () => {
    const foundUser = await findOne.execute(user.id);

    expect(foundUser).toBeDefined();
  });

  it('should fail it with wrong id', async () => {
    await expect(findOne.execute(89898989898)).rejects.toThrow(
      'ERRO: Nenhum usuário foi encontrado.',
    );
  });
});
