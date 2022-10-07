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
  findByName(
    offset: number,
    limit: number,
    name: string,
  ): Promise<[Client[], number]>;
  findByBirthDateRage(
    offset: number,
    limit: number,
    startDate: Date,
    endDate: Date,
  ): Promise<[Client[], number]>;
  findCountAndTotalSalary(
    offset: number,
    limit: number,
    field: IGroupFilterKeys,
  ): Promise<[ICountAndSalaryDTO, number]>;
  importData(data: ICreateClientDTO[]): Promise<number>;
}
