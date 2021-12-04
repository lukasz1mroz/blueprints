import { logger } from '../utils/logger';
import { InternalServerError } from '../utils/errors';
import { SampleResponse } from '../types/response';
import * as Sentry from '@sentry/node';

const LOG_SOURCE = 'sampleService';

export const testAction = (action: string): SampleResponse => {
  try {
    logger.info('testAtion finished', { source: LOG_SOURCE, method: action });
    return {
      status: 200,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw new InternalServerError(LOG_SOURCE, e.message);
    } else {
      throw new Error(String(e));
    }
  }
};
