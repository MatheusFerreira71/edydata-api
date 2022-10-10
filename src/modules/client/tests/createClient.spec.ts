import { Client } from '@prisma/client';
import { afterAll, describe, expect, it } from 'vitest';
import AppError from '../../../shared/errors/AppError';
import ClientRepository from '../infra/database/ClientRepository';
import CreateClientService from '../services/CreateClientService';

describe('Create a Client', () => {
  const clientRepo = new ClientRepository();
  const createClient = new CreateClientService(clientRepo);
  let client: Client;

  afterAll(async () => {
    await clientRepo.delete(client.id);
  });

  it('should be able to create a new client', async () => {
    client = await createClient.execute({
      nome: 'Teste',
      CPF: '12345678945',
      estadoCivil: '2',
      salario: 1000,
      especie: 'f',
      sexo: 'M',
    });

    expect(client).toBeDefined();
  });

  it('should fail if body incorrect', async () => {
    await expect(
      createClient.execute({
        nome: 'Teste',
        CPF: '12345678945',
        estadoCivil: '2',
        salario: 1000,
        especie: 'f',
        sexo: 'M',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should fail if cpf exists', async () => {
    await expect(
      createClient.execute({
        nome: 'Teste',
        CPF: '12345678945',
        estadoCivil: '2',
        salario: 1000,
        especie: 'f',
        sexo: 'M',
      }),
    ).rejects.toThrow('CPF já existente');
  });
});
