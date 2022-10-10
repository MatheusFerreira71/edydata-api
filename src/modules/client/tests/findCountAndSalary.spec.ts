import { describe, expect, it } from 'vitest';

import ClientRepository from '../infra/database/ClientRepository';
import FindCountAndTotalSalaryService from '../services/FindCountAndTotalSalaryService';

describe('Find group of Clients', () => {
  const clientRepo = new ClientRepository();
  const findByName = new FindCountAndTotalSalaryService(clientRepo);

  it('should be able to find the clients list by city', async () => {
    const clients = await findByName.execute('cidade');

    expect(clients).toBeDefined();
  });

  it('should be able to find the clients list by sex', async () => {
    const clients = await findByName.execute('sexo');

    expect(clients).toBeDefined();
  });

  it('should be able to find the clients list by spicies', async () => {
    const clients = await findByName.execute('especie');

    expect(clients).toBeDefined();
  });
});
