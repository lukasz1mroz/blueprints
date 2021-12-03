import express from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import { init } from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import defaultConfig from '../config';
import Router from './controller/Router';
import { expressErrorHandler } from './utils/errorHandler';
import { logger, expressWinstonConfig } from './utils/logger';

const app = express();
const port = 3000;

init(defaultConfig.sentryClient);
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());
app.use(expressWinston.logger(expressWinstonConfig('info')));
app.use(bodyParser.json());
app.use('/', Router);
// app.use(Sentry.Handlers.errorHandler());
app.use(expressWinston.errorLogger(expressWinstonConfig('error')));
app.use(expressErrorHandler);

app.listen(port, () => logger.info(`App listening on port: ${port}`));
