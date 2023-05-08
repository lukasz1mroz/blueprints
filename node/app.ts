import express from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import cors from 'cors';
import responseTime from 'response-time';

import { startLocalRedis, stopLocalRedis} from './src/utils/redisWrapper';
import { config } from './config/index';
import Router from './src/controller/Router';
import { expressErrorHandler } from './src/utils/errorHandler';
import { logger, expressWinstonConfig } from './src/utils/logger';

export const expressApp = async () => {
  const app = express();
  const port = config.app.port;

  const localRedis = await startLocalRedis();

  Sentry.init(config.sentryClient);
  app.use(Sentry.Handlers.tracingHandler());

  app.use(cors());
  app.use(responseTime());
  app.use(expressWinston.logger(expressWinstonConfig('info')));
  app.use(bodyParser.json());

  app.use('/', Router);

  app.use(Sentry.Handlers.errorHandler());

  app.use(expressWinston.errorLogger(expressWinstonConfig('error')));
  app.use(expressErrorHandler);

  const http = app.listen(port, () => logger.info(`App listening on port: ${port}`));

  const shutdown = async () => {
    try {
      await stopLocalRedis(localRedis);
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
