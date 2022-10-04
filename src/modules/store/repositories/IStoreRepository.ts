import { Store } from '@prisma/client';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import IUpdateStoreDTO from '../dtos/IUpdateStoreDTO';

export default interface IStoreRepository {
  create(dataStore: ICreateStoreDTO): Promise<Store>;
  findAll(offset: number, limit: number): Promise<[Store[], number]>;
  findById(id: number): Promise<Store | null>;
  findByStoreId(id: number): Promise<Store | null>;
  find(
    search: string,
    offset: number,
    limit: number,
  ): Promise<[Store[], number]>;
  findByNuvemEmail(email: string): Promise<Store | null>;
  update(id: number, data: IUpdateStoreDTO): Promise<Store>;
  delete(id: number): Promise<string>;
}
