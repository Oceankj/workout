import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpException } from 'src/common/exception/http.exception';

const errorHandlerMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof HttpException) {
        response.status(error.status).json({
            status: error.status,
            message: error.message,
        });
    }

    if (error instanceof ZodError) {
        response.status(400).json({
            status: 400,
            message: 'Validation error',
        });
    }

    response.status(500).json({
        status: 500,
        message: error.message ?? 'Internal Server Error',
    });
};

export default errorHandlerMiddleware;
