import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class DeleteClientService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(id: number): Promise<string> {
    const client = await this.clientRepo.findById(id);

    if (!client) {
      throw new AppError('Cliente não encontrado', 404);
    }

    const updatedClient = await this.clientRepo.delete(id).catch(err => {
      throw new AppError(`${err}`);
    });

    return updatedClient;
  }
}
