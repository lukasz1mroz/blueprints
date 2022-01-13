import { Config } from '../src/types/config';

const getConfig = (): Config => {
  const failure = 0;
  const env = process.env.DEPLOY_ENV;

  if (!env) console.error('\n DEPLOY_ENV variable is missing');

  const envConfigFile = `./env.${env}`;
  let envConfig;

  try {
    envConfig = require(envConfigFile) as Config;
  } catch (e) {
    console.error();
    process.exit(failure);
  }

  return envConfig;
};

export const config = getConfig();
