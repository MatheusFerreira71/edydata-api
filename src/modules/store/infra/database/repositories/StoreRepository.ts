import { Store } from '@prisma/client';
import prisma from '../../../../../prisma';
import ICreateStoreDTO from '../../../dtos/ICreateStoreDTO';
import IUpdateStoreDTO from '../../../dtos/IUpdateStoreDTO';
import IStoreRepository from '../../../repositories/IStoreRepository';

export default class StoreRepository implements IStoreRepository {
  async create(data: ICreateStoreDTO): Promise<Store> {
    const store = await prisma.store.create({ data });

    await prisma.$disconnect();

    return store;
  }

  async findAll(offset: number, limit: number): Promise<[Store[], number]> {
    const elements = await prisma.store.count();
    const stores = await prisma.store.findMany({
      orderBy: { id: 'desc' },
      skip: offset,
      take: limit,
    });

    await prisma.$disconnect();

    return [stores, elements];
  }

  async findById(id: number): Promise<Store | null> {
    const store = await prisma.store.findUnique({ where: { id } });

    await prisma.$disconnect();

    return store;
  }

  async findByStoreId(id: number): Promise<Store | null> {
    const store = await prisma.store.findUnique({
      where: { nuvemshop_store_id: id },
    });

    await prisma.$disconnect();

    return store;
  }

  async find(
    search: string,
    offset: number,
    limit: number,
  ): Promise<[Store[], number]> {
    const elements = await prisma.store.count({
      where: {
        OR: [
          {
            name: { contains: search },
          },
          {
            nuvemshop_email: { contains: search },
          },
          {
            contact_email: { contains: search },
          },
        ],
      },
    });

    const store = await prisma.store.findMany({
      where: {
        OR: [
          {
            name: { contains: search },
          },
          {
            nuvemshop_email: { contains: search },
          },
          {
            contact_email: { contains: search },
          },
        ],
      },
      orderBy: { id: 'desc' },
      skip: offset,
      take: limit,
    });

    await prisma.$disconnect();

    return [store, elements];
  }

  async findByNuvemEmail(email: string): Promise<Store | null> {
    const store = await prisma.store.findUnique({
      where: { nuvemshop_email: email },
    });

    await prisma.$disconnect();

    return store;
  }

  async update(id: number, data: IUpdateStoreDTO): Promise<Store> {
    const updatedStore = await prisma.store.update({
      where: { id },
      data,
    });

    await prisma.$disconnect();
    return updatedStore;
  }

  async delete(id: number): Promise<string> {
    await prisma.store.delete({ where: { id } });

    await prisma.$disconnect();

    return 'Loja deletada com sucesso.';
  }
}
