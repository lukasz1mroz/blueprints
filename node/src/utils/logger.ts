import { createLogger, format, transports } from 'winston';
import { SentryTransport } from './sentryTransport';
import { InfluxTransport } from './influxTransport';

// TODO: Add Transports to Influx/Grafana and S3
const transportsList = [new transports.Console(), new SentryTransport(), new InfluxTransport()];

export const expressWinstonConfig = (level?: string) => ({
  msg: 'HTTP {{req.method}} {{req.url}}',
  format: format.combine(format.timestamp(), format.json()),
  level: level ? level : process?.env?.LOG_LEVEL,
  colorize: true,
  transports: transportsList,
});

export const logger = createLogger(expressWinstonConfig());
