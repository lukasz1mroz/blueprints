// Using dotenv file
// import dotenv from 'dotenv';
// dotenv.config();
// property: process.env.NAME;

import packagejson from '../package.json';

export = {
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
  },
};
