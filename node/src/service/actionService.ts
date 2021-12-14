import { logger } from '../utils/logger';
import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import config from '../config/config';
import { InternalServerError } from '../types/errors';
import { GetPostActionResponse } from '../types/response';
import axios from 'axios';
import Redis from 'ioredis';

const LOG_SOURCE = 'ActionService';
const DEFAULT_EXPIRATION = config.cache.defaultExpiration;
const redis = new Redis();

export const getAction = async (postId?: string): Promise<GetPostActionResponse> => {
  try {
    const cacheKey = postId ? `post_${postId}` : 'posts';

    if (!(await redis.exists(cacheKey))) {
      const getUrl = postId
        ? `https://jsonplaceholder.typicode.com/posts/${postId}`
        : 'https://jsonplaceholder.typicode.com/posts';

      const response = await axios.get(getUrl);
      await redis.setex(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(response.data));

      logger.info('Get action finished', { source: LOG_SOURCE });

      return {
        data: response.data,
        status: 200,
      };
    } else {
      const response = await redis.get(cacheKey);
      return {
        data: JSON.parse(response as string),
        status: 200,
      };
    }
  } catch (e) {
    return asyncErrorHandler(LOG_SOURCE, e);
  }
};

export const postAction = async (): Promise<GetPostActionResponse> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/postss');
    logger.info('Post action finished', { source: LOG_SOURCE });

    return {
      data: 'This is successful response',
      status: 200,
    };
  } catch (e) {
    return asyncErrorHandler(LOG_SOURCE, e);
  }
};
