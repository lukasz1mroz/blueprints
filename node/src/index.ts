import express from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import Router from './controller/Router';
import { returnError } from './utils/errorHandler';
import { logger } from './utils/logger';

const app = express();
const port = 3000;

Sentry.init({
  dsn: 'TODO_SENTRY_KEY',
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use('/', Router);
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (error.status === 404 || error.status === 500) {
        return true;
      }
      return false;
    },
  }),
);
app.use(returnError);

app.listen(port, () => logger.info(`App listening on port: ${port}`));
