import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from 'src/common/exception/http.exception';

const excludedPaths = ['/auth/login', '/auth/register', '/auth/token']; // 不需要授權的路徑

const authorizationMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (excludedPaths.includes(request.path)) {
            return next(); // 直接繼續，不做任何授權檢查
        }

        const authorization = request.headers['authorization'];
        if (!authorization) throw new UnauthorizedException();
        const [, token] = authorization.split(' ');
        try {
            const payload = jwt.verify(token, process.env.ACCESS_KEY_SECRET ?? '');
            request.user = payload;
        } catch (jwtError) {
            throw new UnauthorizedException(jwtError instanceof Error ? jwtError.message : 'Invalid token');
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default authorizationMiddleware;
