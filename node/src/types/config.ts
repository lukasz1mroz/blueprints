export type Config = {
  env: string;
  api: {
    url: string;
  };
  app: {
    port: number;
  };
  auth: {
    accessTokenSecret: string;
    refreshTokenSecret: string;
  };
  sentryClient: {
    dsn: string;
    tracesSampleRate: number;
    attachStacktrace: boolean;
    debug: boolean;
    release: string;
  };
  cache: {
    redis: {
      port: number;
      url: string;
    };
    defaultExpiration: number;
  };
};
