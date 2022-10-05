import { User } from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: IUpdateUserDTO): Promise<User>;
  delete(id: number): Promise<string>;
}
