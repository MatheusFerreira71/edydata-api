import { User } from '@prisma/client';
import prisma from '../../../../prisma';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import IUserRepository from '../../repositories/IUserRepository';

export default class UserRepository implements IUserRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({ data });

    await prisma.$disconnect();
    return user;
  }

  public async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    await prisma.$disconnect();
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    await prisma.$disconnect();
    return user;
  }

  public async update(id: number, data: IUpdateUserDTO): Promise<User> {
    const updatedUser = await prisma.user.update({ where: { id }, data });

    await prisma.$disconnect();
    return updatedUser;
  }

  public async delete(id: number): Promise<string> {
    await prisma.user.delete({ where: { id } });

    return 'Usuário deletado com sucesso.';
  }
}
