import { logger } from '../utils/logger';
import { InternalServerError } from '../utils/errors';
import { GetPostActionResponse } from '../types/response';

const LOG_SOURCE = 'ActionService';

export const getAction = (): GetPostActionResponse => {
  try {
    logger.info('Get action finished', { source: LOG_SOURCE });
    return {
      data: 'This is successful response',
      status: 200,
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'Internal Server Error');
  }
};

export const postAction = (): GetPostActionResponse => {
  try {
    logger.info('Post action finished', { source: LOG_SOURCE });
    return {
      data: 'This is successful response',
      status: 200,
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'Internal Server Error');
  }
};
