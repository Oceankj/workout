import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from 'src/common/exception/http.exception';
import * as cacheRepository from 'src/repository/cache.repository';

const refreshAuthorizationMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authorization = request.headers['authorization'];
        if (!authorization) throw new UnauthorizedException();
        const [, token] = authorization.split(' ');

        try {
            const payload = jwt.verify(token, process.env.REFRESH_KEY_SECRET ?? '');
            const { id } = payload as jwt.JwtPayload;
            const refreshToken = await cacheRepository.get(`user:token:${id}`);
            if (!refreshToken || token !== refreshToken) throw new UnauthorizedException('Unauthorized token');
            request.user = payload;
        } catch (jwtError) {
            throw new UnauthorizedException(jwtError instanceof Error ? jwtError.message : 'Invalid token');
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default refreshAuthorizationMiddleware;
