module.exports = {
  apps: [
    {
      name: 'blueprints',
      script: 'index.js',
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
        DEPLOY_ENV: 'dev',
      },
      env_production: {
        PORT: 80,
        NODE_ENV: 'production',
        DEPLOY_ENV: 'prod',
      },
    },
  ],
};
