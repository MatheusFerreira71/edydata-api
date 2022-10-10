import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';
import IClientRepository from '../repositories/IClientRepository';

export default class UpdateClientService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(id: number, data: IUpdateClientDTO): Promise<Client> {
    const client = await this.clientRepo.findById(id);

    if (!client) {
      throw new AppError('Cliente não encontrado', 404);
    }

    if (data.CPF) {
      const hasCpf = await this.clientRepo.findByCPF(data.CPF);

      if (hasCpf && client.id !== hasCpf.id) {
        throw new AppError('CPF já cadastrado em outra conta', 409);
      }
    }

    const updatedClient = await this.clientRepo.update(id, data).catch(err => {
      throw new AppError(`${err}`);
    });

    return updatedClient;
  }
}
