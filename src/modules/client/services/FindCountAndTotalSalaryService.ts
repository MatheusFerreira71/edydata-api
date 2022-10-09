import ICountAndSalaryDTO from '../dtos/ICountAndSalaryDTO';
import IGroupFilterKeys from '../keys/IGroupFilterKeys';
import IClientRepository from '../repositories/IClientRepository';

export default class FindCountAndTotalSalaryService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(field: IGroupFilterKeys): Promise<ICountAndSalaryDTO> {
    const clients = await this.clientRepo.findCountAndTotalSalary(field);

    return clients;
  }
}
