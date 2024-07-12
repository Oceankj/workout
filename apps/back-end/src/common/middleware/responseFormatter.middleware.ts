import { NextFunction, Request, Response } from 'express';

const responseFormatterMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const originalJson = response.json.bind(response);

    response.json = ((data: any) => {
        if (data && data.status && data.message) {
            return originalJson(data);
        }

        const finalResponse = {
            status: response.statusCode,
            data: data,
        };

        return originalJson(finalResponse);
    }) as typeof response.json;

    next();
};

export default responseFormatterMiddleware;
