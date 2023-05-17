# What is blueprints project?

Blueprints is a starting point codebase for various _JavaScript_ and _TypeScript_ full stack projects. It consists of node.js backend server which connects to external APIs and passes the information to fronend React wrapper.

## Config

Secrets are stored in AWS paremeter store and local configs can be updated with `aws-get-params.sh` script (AWS account setup is required).

## Scripts

Few scripts have been pepared in _/node/scripts_ repository which serve the following purposes:

- Update local and dev config secrets
- Deploy code to AWS
- Starting the application in AWS

## Bundlers

Backend code is compiled with _Babel_ and frontend part with bundled with _Webpack_.

## Code tools

The following code formatting tools have been integrated:

- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

## Testing

Unit and Integration tests are supported for specific files and application.

## Logging

Logging tool is Winston. There are also integrations with external tracking / logging tools:

- [Sentry](https://sentry.io/)
- [Influx](https://www.influxdata.com/)

## Deployment

- Code is prepared to be deployed to AWS EC2 instance with AWS Code Deploy and Pipeline tools. AWS account needs to be setup and credentials updated.

## Local run in Docker or separately

```bash
docker compose -f docker-compose.redis.yml up
```

```bash
    npm run start:local-redis && npm run serve
```
