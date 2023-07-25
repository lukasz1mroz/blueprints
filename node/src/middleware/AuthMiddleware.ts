import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { HEADER_AUTHORIZATION } from '../utils/constants';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../types/errors';
import { logger } from '../utils/logger';
import { config } from '../../config/index';
import { RequestWithUser } from 'src/types/request';

const LOG_SOURCE = 'AuthMiddleware';
const accessTokenSecret = config.auth.accessTokenSecret as string;
const refreshTokenSecret = config.auth.refreshTokenSecret as string;

export default (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authString = req.headers[HEADER_AUTHORIZATION]?.split(' ')[1] as string;

  if (authString === undefined) throw new UnauthorizedError({ logSource: LOG_SOURCE, description: 'Missing credentials' });

  if (req.url === '/api/login' || req.url === '/api/register') {
    const credentials = Buffer.from(authString, 'base64').toString().split(':');

    if (!credentials || credentials.length != 2)
      throw new BadRequestError({ logSource: LOG_SOURCE, description: 'Invalid credentials format' });

    req.user = { name: credentials[0], password: credentials[1] };
    return next();
  }

  jwt.verify(authString, req.url === '/api/refreshToken' || req.url === '/api/removeToken' ? refreshTokenSecret : accessTokenSecret, (err, user) => {
    if (err) throw new ForbiddenError({ logSource: LOG_SOURCE, description: 'Invalid bearer token', details: { err } });

    logger.info('Bearer token validation successful', { source: LOG_SOURCE });
    req.user = user;
    next();
  });
};
