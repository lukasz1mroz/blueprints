export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export type ErrorProps = {
  name: string;
  httpCode: HttpStatusCode;
  logSource: string;
  description: string;
};
