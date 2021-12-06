const defaultConfig = {
  sentryClient: {
    dsn: 'https://9e361baa58de4103815b2d4a6e64b024@o1083541.ingest.sentry.io/6093277',
    tracesSampleRate: 1.0,
    attachStacktrace: true,
    debug: false,
    release: `blueprints@${process.env.npm_package_version}`,
  },
};

export default defaultConfig;
