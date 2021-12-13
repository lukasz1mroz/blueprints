import dotenv from 'dotenv';

dotenv.config();

const config = {
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
  sentryClient: {
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    attachStacktrace: true,
    debug: false,
    release: `blueprints@${process.env.npm_package_version}`,
  },
  cache: {
    defaultTtl: 10,
  },
};

export default config;
