import { BAD_GATEWAY, BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes';

export type ErrorProps = {
  logSource: string;
  description?: string;
  details?: any;
};

export type CustomErrorProps = ErrorProps & {
  name: string;
  url?: string;
  httpCode: number;
};

export class CustomError extends Error {
  name: string;
  httpCode: number;
  logSource: string;
  description: string | undefined;
  details: object | undefined;
  url: string | undefined;

  constructor({ name, httpCode, logSource, description, details, url }: CustomErrorProps) {
    super(description);
    this.name = name;
    this.httpCode = httpCode;
    this.logSource = logSource;
    this.description = description;
    this.details = details;
    this.url = url;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor({ logSource, description, details }: ErrorProps) {
    super({
      name: 'BAD REQUEST',
      httpCode: BAD_REQUEST,
      logSource,
      description,
      details,
    });
  }
}

export class InternalServerError extends CustomError {
  constructor({ logSource, description, details }: ErrorProps) {
    super({
      name: 'INTERNAL SERVER ERROR',
      httpCode: INTERNAL_SERVER_ERROR,
      logSource,
      description,
      details,
    });
  }
}

export class UnauthorizedError extends CustomError {
  constructor({ logSource, description, details }: ErrorProps) {
    super({
      name: 'Unauthorized ERROR',
      httpCode: UNAUTHORIZED,
      logSource,
      description,
      details,
    });
  }
}

export class ForbiddenError extends CustomError {
  constructor({ logSource, description, details }: ErrorProps) {
    super({
      name: 'FORBIDDEN ERROR',
      httpCode: FORBIDDEN,
      logSource,
      description,
      details,
    });
  }
}

export class BadGatewayError extends CustomError {
  constructor({ logSource, description, details }: ErrorProps) {
    super({
      name: 'BAD GATEWAY ERROR',
      httpCode: BAD_GATEWAY,
      logSource,
      description,
      details,
    });
  }
}
