import { ConflictException } from '../common/exceptions/http.exception';
import * as userRepository from '../repository/user.repository';
import * as bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await userRepository.getUserByEmail(email);
    if (user) throw new ConflictException('!!!!'); // TODO error middleware
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_SALT)
    );

    const createUser = await userRepository.createUser({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).json({ data: createUser });
  } catch (error) {
    next(error);
  }
};
