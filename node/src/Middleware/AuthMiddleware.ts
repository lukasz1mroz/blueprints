import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { HEADER_AUTHORIZATION } from '../utils/constants';
import { validateJSONData } from '../utils/validators';
import { UnauthorizedError } from '../utils/errors';
import { logger } from '../utils/logger';
import config from '../config/config';
import { RequestWithUser } from 'src/types/request';

const LOG_SOURCE = 'tokenValidator';
const accessTokenSecret = config.auth.accessTokenSecret as string;

export default (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.url == '/loginAction') {
    const authSchema = {
      id: 'authSchema',
      type: 'object',
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['name', 'password'],
    };
    validateJSONData(req.body, authSchema);
    return next();
  }

  const token = req.headers[HEADER_AUTHORIZATION]?.split(' ')[1] as string;

  if (token === 'null') throw new UnauthorizedError(LOG_SOURCE, 'Missing token');

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) throw new UnauthorizedError(LOG_SOURCE, 'Invalid access token');

    logger.info('Token validation successful', { source: LOG_SOURCE });

    req.user = user;
    next();
  });
};
