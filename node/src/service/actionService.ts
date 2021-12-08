import { logger } from '../utils/logger';
import { InternalServerError } from '../utils/errors';
import { GetPostActionResponse } from '../types/response';

const LOG_SOURCE = 'actionService';

export const getPostAction = (action: string): GetPostActionResponse => {
  try {
    logger.info('getPostAtion finished', { source: LOG_SOURCE, method: action });
    return {
      data: 'This is successful response',
      status: 200,
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'Internal Server Error');
  }
};
