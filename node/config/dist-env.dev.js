import packagejson from '../package.json';

module.exports = {
  env: 'dev',
  api: {
    url: 'https://jsonplaceholder.typicode.com/posts',
  },
  app: {
    port: 3000,
  },
  auth: {
    accessTokenSecret: '$ACCESS_TOKEN_SECRET',
    refreshTokenSecret: '$REFRESH_TOKEN_SECRET',
    expiresIn: '30s',
  },
  influx: {
    dbUrl: '$INFLUX_DB_URL',
    token: '$INFLUX_TOKEN',
    org: '$INFLUX_ORG',
    bucket: '$INFLUX_BUCKET',
  },
  sentryClient: {
    dsn: '$SENTRY_DSN',
    tracesSampleRate: 1.0,
    attachStacktrace: true,
    debug: false,
    release: `blueprints@${packagejson.version}`,
  },
  cache: {
    redis: {
      port: 6379,
      url: '$REDIS_URL',
    },
    defaultExpiration: 60,
  },
  db: {
    user: '$DB_USER',
    host: 'localhost',
    database: 'blueprints',
    password: '$DB_PASSWORD',
    port: 5432,
  },
};
