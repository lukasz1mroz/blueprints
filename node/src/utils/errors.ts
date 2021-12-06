import { ErrorProps, HttpStatusCode } from '../types/errors';

export class BaseError extends Error {
  name: string;
  httpCode: HttpStatusCode;
  logSource: string;
  description: string;

  constructor({ name, httpCode, logSource, description }: ErrorProps) {
    super(description);
    this.name = name;
    this.httpCode = httpCode;
    this.logSource = logSource;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends BaseError {
  constructor(logSource: string, description: string) {
    super({
      name: 'BAD REQUEST',
      httpCode: HttpStatusCode.BAD_REQUEST,
      logSource,
      description,
    });
  }
}

export class InternalServerError extends BaseError {
  constructor(logSource: string, description: string) {
    super({
      name: 'INTERNAL SERVER ERROR',
      httpCode: HttpStatusCode.INTERNAL_SERVER,
      logSource,
      description,
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor(logSource: string, description: string) {
    super({
      name: 'UNAUTHORIZED ERROR',
      httpCode: HttpStatusCode.UNAUTHORIZED,
      logSource,
      description,
    });
  }
}
