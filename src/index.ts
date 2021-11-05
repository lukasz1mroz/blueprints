import express from 'express';
import Router from './controller/Router';
import { returnError } from './utils/errorHandler';
import { logger } from './utils/logger';

const app = express();
const port = 3000;

app.use('/', Router);
app.use(returnError);

app.listen(port, () => logger.info(`App listening on port: ${port}`));
