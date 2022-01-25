import { config } from '../../config';
import RedisServer from 'redis-server';
import Redis from 'ioredis';
import { logger } from '../utils/logger';

export const startLocalRedis = () => {
  let redisServer;
  if (config.env === 'local') {
    redisServer = new RedisServer();
    redisServer.open(() => logger.info('Local Redis server opened'));
  }
  return redisServer;
};

export const stopLocalRedis = (redisServer: RedisServer) =>
  redisServer.close(() => logger.info('Local Redis server closed'));

export const startRedisClient = () => {
  const redisClient = new Redis(
    (config.env !== 'local' && {
      port: config.cache.redis.port,
      host: config.cache.redis.url,
    }) ||
      {},
  );
  return redisClient;
};
