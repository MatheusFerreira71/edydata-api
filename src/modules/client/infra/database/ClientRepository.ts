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

  public async findByName(
    offset: number,
    limit: number,
    name: string,
  ): Promise<[Client[], number]> {
    const elements = prisma.client.count({
      where: { nome: { contains: name } },
    });

    const clients = prisma.client.findMany({
      skip: offset,
      take: limit,
      where: { nome: { contains: name } },
    });

    const responses = await Promise.all([clients, elements]);

    await prisma.$disconnect();

    return responses;
  }

  public async findByBirthDateRage(
    offset: number,
    limit: number,
    startDate: Date,
    endDate: Date,
  ): Promise<[Client[], number]> {
    const elements = prisma.client.count({
      where: { dataNascimento: { gte: startDate, lte: endDate } },
    });

    const clients = prisma.client.findMany({
      skip: offset,
      take: limit,
      where: { dataNascimento: { gte: startDate, lte: endDate } },
    });

    const responses = await Promise.all([clients, elements]);

    await prisma.$disconnect();

    return responses;
  }

  public async findCountAndTotalSalary(
    offset: number,
    limit: number,
    field: IGroupFilterKeys,
  ): Promise<[ICountAndSalaryDTO, number]> {
    const elements = await prisma.client.groupBy({
      by: [field],
      where: { [field]: { notIn: [''] } },
    });

    const countAndSalaryByField = await prisma.client.groupBy({
      by: [field],
      orderBy: {
        _count: {
          [field]: 'asc',
        },
      },
      _count: { id: true },
      _sum: { salario: true },
      where: { [field]: { notIn: [''] } },
      skip: offset,
      take: limit,
    });

    await prisma.$disconnect();

    return [countAndSalaryByField, elements.length];
  }

  public async importData(data: ICreateClientDTO[]): Promise<number> {
    const clientsImported = await prisma.client.createMany({
      data,
      skipDuplicates: true,
    });

    return clientsImported.count;
  }
}
