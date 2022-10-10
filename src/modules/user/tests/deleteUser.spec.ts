import { User } from '@prisma/client';
import { beforeAll, describe, it, expect } from 'vitest';
import BCryptHashProvider from '../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../infra/database/UserRepository';
import DeleteUserservice from '../services/DeleteUserService';

describe('Delete User', () => {
  const userRepo = new UserRepository();
  const hashProvider = new BCryptHashProvider();
  const deleteUser = new DeleteUserservice(userRepo);
  let user: User;

  beforeAll(async () => {
    user = await userRepo.create({
      name: 'Vistest Test',
      email: 'vitest@teste.com',
      password: await hashProvider.generateHash('senhaTest'),
    });
  });

  it('should fail with wrong id', async () => {
    await expect(deleteUser.execute(67435456456465)).rejects.toThrow(
      'ERRO: Nenhum usuário foi encontrado.',
    );
  });

  it('should delete the user', async () => {
    const message = await deleteUser.execute(user.id);

    expect(message).toBe('Usuário deletado com sucesso.');
  });
});
