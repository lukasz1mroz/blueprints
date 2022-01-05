// Using dotenv file
// import dotenv from 'dotenv';
// dotenv.config();
// property: process.env.NAME;

import packagejson from '../package.json';

module.exports = {
  auth: {
    accessTokenSecret: '29306ba92b5b7630e9bac47feb1eca8be6e276aeb8bd4d4d8ba45410b18972c654a7c9e3c616ddd3904a46282c29e9cacdba4afea12f33aa23ff1ffa2b97b4a2',
    refreshTokenSecret: '4519dd1900834b80c5cb87bb9e089dbad9a3899bf46efbfe57278a357c2c38837c398b73f50b58d4995f24d877a50f1a26d4b2d3ebbad1bb4226d956262b3694',
  },
  sentryClient: {
    dsn: 'https://9e361baa58de4103815b2d4a6e64b024@o1083541.ingest.sentry.io/6093277',
    tracesSampleRate: 1.0,
    attachStacktrace: true,
    debug: false,
    release: `blueprints@${packagejson.version}`,
  },
  cache: {
    defaultExpiration: 60,
  },
};
