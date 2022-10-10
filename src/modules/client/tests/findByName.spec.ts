import { describe, expect, it } from 'vitest';

import ClientRepository from '../infra/database/ClientRepository';
import FindClientsByNameService from '../services/FindClientsByNameService';

describe('Find Clients by Name', () => {
  const clientRepo = new ClientRepository();
  const findByName = new FindClientsByNameService(clientRepo);

  it('should be able to find the clients list', async () => {
    const clients = await findByName.execute('Marcos');

    expect(clients).toBeDefined();
  });
});
