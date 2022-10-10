import { Client } from '@prisma/client';
import prisma from '../../../../prisma';
import ICountAndSalaryDTO from '../../dtos/ICountAndSalaryDTO';
import ICreateClientDTO from '../../dtos/ICreateClientDTO';
import IUpdateClientDTO from '../../dtos/IUpdateClientDTO';
import IGroupFilterKeys from '../../keys/IGroupFilterKeys';
import IClientRepository from '../../repositories/IClientRepository';

export default class ClientRepository implements IClientRepository {
  public async create(data: ICreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({ data });

    await prisma.$disconnect();
    return client;
  }

  public async update(id: number, data: IUpdateClientDTO): Promise<Client> {
    const updatedClient = await prisma.client.update({ where: { id }, data });

    await prisma.$disconnect();
    return updatedClient;
  }

  public async delete(id: number): Promise<string> {
    await prisma.client.delete({ where: { id } });

    await prisma.$disconnect();
    return 'Cliente deletado com sucesso';
  }

  public async findById(id: number): Promise<Client | null> {
    const client = await prisma.client.findUnique({ where: { id } });

    await prisma.$disconnect();
    return client;
  }

  public async findByCPF(CPF: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({ where: { CPF } });

    await prisma.$disconnect();
    return client;
  }

  public async findByName(name: string): Promise<Client[]> {
    const clients = await prisma.client.findMany({
      where: { nome: { contains: name } },
    });

    await prisma.$disconnect();

    return clients;
  }

  public async findByBirthDateRage(
    startDate: Date,
    endDate: Date,
  ): Promise<Client[]> {
    const clients = await prisma.client.findMany({
      where: { dataNascimento: { gte: startDate, lte: endDate } },
    });

    await prisma.$disconnect();

    return clients;
  }

  public async findCountAndTotalSalary(
    field: IGroupFilterKeys,
  ): Promise<ICountAndSalaryDTO> {
    const countAndSalaryByField = await prisma.client.groupBy({
      by: [field],
      orderBy: {
        _count: {
          [field]: 'desc',
        },
      },
      _count: { id: true },
      _sum: { salario: true },
      where: { [field]: { notIn: [''] } },
    });

    await prisma.$disconnect();

    return countAndSalaryByField;
  }

  public async importData(data: ICreateClientDTO[]): Promise<number> {
    const clientsImported = await prisma.client.createMany({
      data,
      skipDuplicates: true,
    });

    return clientsImported.count;
  }
}
