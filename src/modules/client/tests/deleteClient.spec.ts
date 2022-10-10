import { Client } from '@prisma/client';
import { describe, beforeAll, it, expect } from 'vitest';
import ClientRepository from '../infra/database/ClientRepository';
import DeleteClientService from '../services/DeleteClientService';

describe('Delete a Client', () => {
  const clientRepo = new ClientRepository();
  const deleteClient = new DeleteClientService(clientRepo);
  let client: Client;

  beforeAll(async () => {
    client = await clientRepo.create({
      nome: 'Teste',
      CPF: '12345678945',
      estadoCivil: '2',
      salario: 1000,
      especie: 'f',
      sexo: 'M',
    });
  });

  it('should fail with wrong id', async () => {
    await expect(deleteClient.execute(67435456456465)).rejects.toThrow(
      'Cliente não encontrado',
    );
  });

  it('should delete the client', async () => {
    const message = await deleteClient.execute(client.id);

    expect(message).toBe('Cliente deletado com sucesso');
  });
});
