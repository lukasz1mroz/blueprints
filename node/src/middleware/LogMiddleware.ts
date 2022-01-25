import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export default (req: Request, res: Response, next: NextFunction) => {
  logger.info('Logger info', {
    status: res.statusCode,
    endpoint: req.url,
    method: req.method,
  });
  next();
};
