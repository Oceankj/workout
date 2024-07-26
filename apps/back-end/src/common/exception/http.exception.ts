export class HttpException extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

export class ConflictException extends HttpException {
    constructor(message?: string) {
        super(message ?? 'Conflict', 409);
    }
}

export class NotFoundException extends HttpException {
    constructor(message?: string) {
        super(message ?? 'Not Found', 404);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message?: string) {
        super(message ?? 'Unauthorized.', 401);
    }
}
