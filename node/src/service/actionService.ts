import { logger } from '../utils/logger';
import { InternalServerError } from '../types/errors';
import { GetPostActionResponse } from '../types/response';
import axios from 'axios';

const LOG_SOURCE = 'ActionService';

export const getAction = async (postId: string): Promise<GetPostActionResponse> => {
  try {
    const postUrl = postId
      ? `https://jsonplaceholder.typicode.com/posts/${postId}`
      : 'https://jsonplaceholder.typicode.com/posts';

    const response = await axios.get(postUrl);

    logger.info('Get action finished', { source: LOG_SOURCE });

    return {
      data: response.data,
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
