import { Client } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import ClientRepository from '../infra/database/ClientRepository';
import FindClientByIdService from '../services/FindClientByIdService';

describe('Find Client by Id', () => {
  const clientRepo = new ClientRepository();
  const findById = new FindClientByIdService(clientRepo);
  let client: Client;

  beforeEach(async () => {
    client = await clientRepo.create({
      nome: 'Teste',
      CPF: '12345678945',
      estadoCivil: '2',
      salario: 1000,
      especie: 'f',
      sexo: 'M',
    });
  });

  afterEach(async () => {
    await clientRepo.delete(client.id);
  });

  it('should be able to find the client', async () => {
    client = await findById.execute(client.id);

    expect(client).toBeDefined();
  });

  it('should fail if id incorrect', async () => {
    await expect(findById.execute(132123123132)).rejects.toThrow(
      'Cliente não encontrado',
    );
  });
});
