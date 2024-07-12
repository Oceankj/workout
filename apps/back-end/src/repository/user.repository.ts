import User from 'src/model/user.model';
import { UserAttributes, UserCreationAttributes } from 'src/model/user.model';

export const createUser = async (
  userData: Omit<UserCreationAttributes, 'id'>
) => {
  return await User.create(userData);
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const getUserById = async (userId: number) => {
  return await User.findByPk(userId);
};

export const updateUser = async (
  userId: number,
  userData: Partial<UserAttributes>
) => {
  return await User.update(userData, { where: { id: userId } });
};

export const deleteUser = async (userId: number) => {
  return await User.destroy({ where: { id: userId } });
};

export const getAllUsers = async () => {
  return await User.findAll();
};
