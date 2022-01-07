import { request } from './RequestService';
import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import { config } from '../../config/index';
import { GetPostActionResponse } from '../types/response';
import Redis from 'ioredis';

const LOG_SOURCE = 'ActionService';
const DEFAULT_EXPIRATION = config.cache.defaultExpiration;
const API_URL = config.api.url;
const redis = new Redis();

export const getAction = async (postId?: string): Promise<GetPostActionResponse> => {
  try {
    const cacheKey = postId ? `post_${postId}` : 'posts';

    if (!(await redis.exists(cacheKey))) {
      const response = await request('GET', API_URL, postId);
      await redis.setex(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(response.data));

      // Writing file and stream with FS
      // writeFile('./data.json', response.data);
      // handleStream('./data.json', './data-cp.json');

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
    const response = await request('POST', API_URL);

    return {
      data: 'This is successful response',
      status: 200,
    };
  } catch (e) {
    return asyncErrorHandler(LOG_SOURCE, e);
  }
};
