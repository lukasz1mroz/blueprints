export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export type ErrorProps = {
  logSource: string;
  description?: string;
  details?: any;
};

export type CustomErrorProps = ErrorProps & {
  name: string;
  url?: string;
  httpCode: HttpStatusCode;
};

export class CustomError extends Error {
  name: string;
  httpCode: HttpStatusCode;
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
      httpCode: HttpStatusCode.BAD_REQUEST,
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
      httpCode: HttpStatusCode.INTERNAL_SERVER,
      logSource,
      description,
      details,
    });
  }
}

export class UnauthorizedError extends CustomError {
  constructor({ logSource, description, details }: ErrorProps) {
    super({
      name: 'UNAUTHORIZED ERROR',
      httpCode: HttpStatusCode.UNAUTHORIZED,
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
      httpCode: HttpStatusCode.FORBIDDEN,
      logSource,
      description,
      details,
    });
  }
}
