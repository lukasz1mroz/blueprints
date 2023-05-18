import { config } from '../../config';
import Redis from 'ioredis';
const container = process.env.CONTAINER

export const startRedisClient = () => {
  const redisClient = new Redis({
      port: config.cache.redis.port,
      host: container ? 'redis' : config.cache.redis.url,
    });
  return redisClient;
};
