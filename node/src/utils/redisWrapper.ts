import { config } from '../../config';
import Redis from 'ioredis';

export const startRedisClient = () => {
  const redisClient = new Redis({
      port: config.cache.redis.port,
      host: config.cache.redis.url,
    });
  return redisClient;
};
