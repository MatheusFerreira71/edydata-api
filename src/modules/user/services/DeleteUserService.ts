import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

export default class DeleteUserservice {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: number): Promise<string> {
    const checkUserExist = await this.userRepository.findById(id);

    if (!checkUserExist) {
      throw new AppError('ERRO: Nenhum usuário foi encontrado.', 404);
    }

    const user = await this.userRepository.delete(id);

    return user;
  }
}
