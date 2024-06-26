import { NextFunction } from 'express';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '../common/exception/http.exception';
import * as userRepository from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const register = async (req, res, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const user = await userRepository.getUserByEmail(email);
    if (user) throw new ConflictException('Email already existed!'); // TODO error middleware
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

export const login = async (req, res, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundException('Email not existed!'); // TODO error middleware
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException();

    const payload = { id: user.id, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// TODO refreshToken
// TODO request body check
// TODO token guard
