
export const startRedisClient = () => ({
  exists: (cacheKey) => cacheKey === 'post_wrong_id' && false,
  setex: () => true,
  get: () => true,
});
