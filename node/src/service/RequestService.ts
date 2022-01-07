import axios, { Method } from 'axios';
import { UnauthorizedError, BadGatewayError } from '../types/errors';
import { CREATED, NO_CONTENT, OK, UNAUTHORIZED } from 'http-status-codes';

const LOG_SOURCE = 'networkService';

export const request = async (method: Method, url: string, param?: string) => {
  const fullUrl = param ? `${url}/${param}` : url;

  const result = await axios(fullUrl, { method: method });

  if (result.status === UNAUTHORIZED) {
    throw new UnauthorizedError({ logSource: LOG_SOURCE, details: result });
  }
  if (![OK, CREATED, NO_CONTENT].includes(result.status)) {
    throw new BadGatewayError({ logSource: LOG_SOURCE, details: result });
  }

  return result;
};
