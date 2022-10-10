import { Client } from '@prisma/client';
import ICountAndSalaryDTO from '../dtos/ICountAndSalaryDTO';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';
import IGroupFilterKeys from '../keys/IGroupFilterKeys';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: number, data: IUpdateClientDTO): Promise<Client>;
  delete(id: number): Promise<string>;
  findById(id: number): Promise<Client | null>;
  findByCPF(CPF: string): Promise<Client | null>;
  findByName(name: string): Promise<Client[]>;
  findByBirthDateRage(startDate: Date, endDate: Date): Promise<Client[]>;
  findCountAndTotalSalary(field: IGroupFilterKeys): Promise<ICountAndSalaryDTO>;
  importData(data: ICreateClientDTO[]): Promise<number>;
}
