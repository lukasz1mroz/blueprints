import express from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';

import { config } from './config/index';
import Router from './src/controller/Router';
import { expressErrorHandler } from './src/utils/errorHandler';
import { logger, expressWinstonConfig } from './src/utils/logger';

const app = express();
const port = 3000;

Sentry.init(config.sentryClient);
app.use(Sentry.Handlers.tracingHandler());

app.use(expressWinston.logger(expressWinstonConfig('info')));
app.use(bodyParser.json());
// app.use(express.json());

app.use('/', Router);

app.use(Sentry.Handlers.errorHandler());

app.use(expressWinston.errorLogger(expressWinstonConfig('error')));
app.use(expressErrorHandler);

app.listen(port, () => logger.info(`App listening on port: ${port}`));
