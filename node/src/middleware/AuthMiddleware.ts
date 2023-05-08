import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { HEADER_AUTHORIZATION } from '../utils/constants';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../types/errors';
import { logger } from '../utils/logger';
import { config } from '../../config/index';
import { RequestWithUser } from 'src/types/request';

const LOG_SOURCE = 'tokenValidator';
const accessTokenSecret = config.auth.accessTokenSecret as string;
const refreshTokenSecret = config.auth.refreshTokenSecret as string;

export default (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authString = req.headers[HEADER_AUTHORIZATION]?.split(' ')[1] as string;

  if (authString === 'null') throw new UnauthorizedError({ logSource: LOG_SOURCE, description: 'Missing token' });

  if (req.url === '/login' || req.url === '/register') {
    const credentials = Buffer.from(authString, 'base64').toString().split(':');

    if (!credentials || credentials.length != 2)
      throw new BadRequestError({ logSource: LOG_SOURCE, description: 'Invalid credentials format' });

    req.user = { name: credentials[0], password: credentials[1] };
    return next();
  }

  jwt.verify(authString, req.url === '/refreshToken' || req.url === '/removeToken' ? refreshTokenSecret : accessTokenSecret, (err, user) => {
    if (err) throw new ForbiddenError({ logSource: LOG_SOURCE, description: 'Invalid bearer token', details: { err } });

    logger.info('Bearer token validation successful', { source: LOG_SOURCE });
    req.user = user;
    next();
  });
};
