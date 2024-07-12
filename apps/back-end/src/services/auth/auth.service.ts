import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ConflictException, NotFoundException, UnauthorizedException } from 'src/common/exception/http.exception';
import * as userRepository from 'src/repository/user.repository';
import * as cacheRepository from 'src/repository/cache.repository';
import { RegisterRequest, registerRequestSchema, LoginRequest, loginRequestSchema } from 'src/services/auth/type/auth.type';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name }: RegisterRequest = registerRequestSchema.parse(req.body);
        const user = await userRepository.getUserByEmail(email);
        if (user) throw new ConflictException('Email already existed!');
        const hashSalt = process.env.HASH_SALT ?? '0';
        const hashPassword = await bcrypt.hash(password, parseInt(hashSalt));
        await userRepository.createUser({
            name,
            email,
            password: hashPassword,
        });

        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: LoginRequest = loginRequestSchema.parse(req.body);
        const user = await userRepository.getUserByEmail(email);
        if (!user) throw new NotFoundException('Email not existed!');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new UnauthorizedException();

        const { accessToken, refreshToken } = generateTokens({ user });
        await cacheRepository.set(`user:token:${user.id}`, refreshToken, 7 * 24 * 60 * 60);

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
};

export const getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user as jwt.JwtPayload;
        const user = await userRepository.getUserById(id);
        if (!user || user.isDeleted) throw new NotFoundException('Not Found!');

        const { accessToken, refreshToken } = generateTokens({ user });
        await cacheRepository.set(`user:token:${user.id}`, refreshToken, 7 * 24 * 60 * 60);

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
};

const generateTokens = (data: Record<string, any>) => {
    const accessSecret = process.env.ACCESS_KEY_SECRET ?? '';
    const refreshSecret = process.env.REFRESH_KEY_SECRET ?? '';

    const { user } = data;
    const payload = { id: user.id, name: user.name };
    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
