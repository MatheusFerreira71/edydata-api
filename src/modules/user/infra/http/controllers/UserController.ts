import { Request, Response } from 'express';
import BCryptHashProvider from '../../../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserservice from '../../../services/DeleteUserService';
import FindOneUserService from '../../../services/FindOneUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import UserRepository from '../../database/UserRepository';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();

    const { name, email, password } = req.body;

    const createUser = new CreateUserService(userRepository, hashProvider);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const { id } = req.user;

    const findOneUser = new FindOneUserService(userRepository);

    const user = await findOneUser.execute(Number(id));

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const { name, email } = req.body;

    const updateUser = new UpdateUserService(userRepository);

    const user = await updateUser.execute(req.user.id, {
      name,
      email,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const deleteUser = new DeleteUserservice(userRepository);

    const user = await deleteUser.execute(req.user.id);

    return res.json(user);
  }
}
