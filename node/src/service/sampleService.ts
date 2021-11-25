import { logger } from '../utils/logger';
import { SampleError } from '../utils/errors';
import { SampleResponse } from '../types/response';

const LOG_SOURCE = 'sampleService';

export const testAction = (action: string): SampleResponse => {
  try {
    logger.info('testAtion finished', { source: LOG_SOURCE, method: action });
    return {
      status: 200,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw new SampleError({
        logSource: LOG_SOURCE,
        message: e.message,
      });
    } else {
      throw new Error(String(e));
    }
  }
};
