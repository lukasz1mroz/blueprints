// Using dotenv file
// import dotenv from 'dotenv';
// dotenv.config();
// property: process.env.NAME;

import packagejson from '../package.json';

module.exports = {
  env: 'local',
  api: {
    url: 'https://jsonplaceholder.typicode.com/posts',
  },
  app: {
    port: 3000,
  },
  auth: {
    accessTokenSecret: '$ACCESS_TOKEN_SECRET',
    refreshTokenSecret: '$REFRESH_TOKEN_SECRET',
    expiresIn: '30m',
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
    defaultExpiration: 60,
    redis: {
      port: 6379,
      host: '127.0.0.1',
    },
  },
  db: {
    user: '$DB_USER',
    host: 'localhost',
    database: 'blueprints',
    password: '$DB_PASSWORD',
    port: 5432,
  },
};
