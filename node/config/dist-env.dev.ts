// Using dotenv file
// import dotenv from 'dotenv';
// dotenv.config();
// property: process.env.NAME;

import packagejson from '../package.json';

module.exports = {
  auth: {
    accessTokenSecret: '$ACCESS_TOKEN_SECRET',
    refreshTokenSecret: '$REFRESH_TOKEN_SECRET',
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
