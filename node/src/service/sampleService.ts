import { logger } from '../utils/logger';
import { SampleError } from '../utils/errors';
import { SampleResponse } from '../types/response';
import * as Sentry from '@sentry/node';

const LOG_SOURCE = 'sampleService';
const transaction = Sentry.startTransaction({
  op: 'test',
  name: 'My First Test Transaction',
});

export const testAction = (action: string): SampleResponse => {
  try {
    logger.info('testAtion finished', { source: LOG_SOURCE, method: action });
    return {
      status: 200,
    };
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);

      throw new SampleError({
        logSource: LOG_SOURCE,
        message: e.message,
      });
    } else {
      throw new Error(String(e));
    }
  } finally {
    transaction.finish();
  }
};
