import { User } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import BCryptHashProvider from '../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../infra/database/UserRepository';
import ChangePasswordUserService from '../services/ChangeUserPassword';

describe('Change User Password', () => {
  const userRepo = new UserRepository();
  const hashProvider = new BCryptHashProvider();
  const changePass = new ChangePasswordUserService(userRepo, hashProvider);
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

  it('should be able to change the user password', async () => {
    const message = await changePass.execute(
      'senhaTeste',
      'novaSenha',
      user.id,
    );

    expect(message).toBe('A senha foi alterada com sucesso');
  });

  it('should fail it with wrong password', async () => {
    await expect(
      changePass.execute('senhaErrada', 'novaSenha', user.id),
    ).rejects.toThrow('Senha inválida');
  });

  it('should fail it with wrong id', async () => {
    await expect(
      changePass.execute('senhaTeste', 'novaSenha', 99999999999),
    ).rejects.toThrow('ERRO: Nenhum usuário foi encontrado.');
  });

  it('should fail with same password', async () => {
    await expect(
      changePass.execute('senhaTeste', 'senhaTeste', user.id),
    ).rejects.toThrow('ERRO: A nova senha deve ser diferente da atual');
  });
});
