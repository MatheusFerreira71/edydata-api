import { Request, Response } from 'express';
import BCryptHashProvider from '../../../../../shared/providers/hashProvider/implementations/BCryptHashProvider';
import ChangePasswordUserService from '../../../services/ChangeUserPassword';
import SessionUserService from '../../../services/SessionUserService';
import UserRepository from '../../database/UserRepository';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();
    const authenticateUser = new SessionUserService(
      userRepository,
      hashProvider,
    );

    const auth = await authenticateUser.execute({
      email,
      password,
    });

    return res.json(auth);
  }

  public async changePassword(req: Request, res: Response): Promise<Response> {
    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();

    const { oldPassword, newPassword } = req.body;

    const changePassword = new ChangePasswordUserService(
      userRepository,
      hashProvider,
    );

    const user = await changePassword.execute(
      oldPassword,
      newPassword,
      req.user.id,
    );

    return res.json(user);
  }
}
export default SessionsController;
