import { Client } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import ClientRepository from '../infra/database/ClientRepository';
import UpdateClientService from '../services/UpdateClientService';

describe('Update a Client', () => {
  const clientRepo = new ClientRepository();
  const updateClient = new UpdateClientService(clientRepo);
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

  it('should fail with wrong id', async () => {
    await expect(
      updateClient.execute(123812938129831, {
        nome: 'Teste 2',
      }),
    ).rejects.toThrow('Cliente não encontrado');
  });

  it('should fail if cpf duplicated', async () => {
    const compareclient = await clientRepo.create({
      nome: 'Teste',
      CPF: '12345678912',
      estadoCivil: '2',
      salario: 1000,
      especie: 'f',
      sexo: 'M',
    });

    await expect(
      updateClient.execute(client.id, {
        CPF: '12345678912',
      }),
    ).rejects.toThrow('CPF já cadastrado em outra conta');

    await clientRepo.delete(compareclient.id);
  });

  it('should update an client', async () => {
    const updatedclient = await updateClient.execute(client.id, {
      nome: 'Cristopher',
    });

    expect(updatedclient).toBeDefined();
  });
});
