import { describe, it, expect } from 'vitest';
import ClientRepository from '../infra/database/ClientRepository';
import FindClientsByBirthDateService from '../services/FindClientsByBirthDateService';

describe('Find Clients by birthdate', () => {
  const clientRepo = new ClientRepository();
  const findByBirth = new FindClientsByBirthDateService(clientRepo);
  const initialDate = new Date('01-01-1950');
  const endDate = new Date();

  it('should be able to find the clients list', async () => {
    const clients = await findByBirth.execute(initialDate, endDate);

    expect(clients).toBeDefined();
  });

  it('should fail if dates overlap', async () => {
    await expect(findByBirth.execute(endDate, initialDate)).rejects.toThrow(
      'A data de início não pode ser maior que a data de fim',
    );
  });
});
