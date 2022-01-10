import express from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';
import RedisServer from 'redis-server';

import { config } from './config/index';
import Router from './src/controller/Router';
import { expressErrorHandler } from './src/utils/errorHandler';
import { logger, expressWinstonConfig } from './src/utils/logger';

export const expressApp = () => {
  const app = express();
  const port = config.app.port;
  const redisServer = new RedisServer();

  // Open and close redis sever here when redis-server type can be used
  redisServer.open(() => logger.info('Redis server opened'));

  Sentry.init(config.sentryClient);
  app.use(Sentry.Handlers.tracingHandler());

  app.use(expressWinston.logger(expressWinstonConfig('info')));
  app.use(bodyParser.json());
  // app.use(express.json());

  app.use('/', Router);

  app.use(Sentry.Handlers.errorHandler());

  app.use(expressWinston.errorLogger(expressWinstonConfig('error')));
  app.use(expressErrorHandler);

  const http = app.listen(port, () => logger.info(`App listening on port: ${port}`));

  const shutdown = async () => {
    try {
      redisServer.close(() => logger.info('Redis server stopped'));
      await http.close(() => logger.info('App stopped'));
      setTimeout(() => process.exit(0));
    } catch (e) {
      process.exit(1);
    }
  };

  process.on('exit', shutdown);
  process.on('close', shutdown);
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return Promise.resolve(http);
};

export default { expressApp };
