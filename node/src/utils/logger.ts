import { createLogger, format, transports } from 'winston';
import { SentryTransport } from './sentryTransport';

const transportsList = [new transports.Console(), new SentryTransport()];

export const expressWinstonConfig = (level?: string) => ({
  msg: 'HTTP {{req.method}} {{req.url}}',
  format: format.combine(format.timestamp(), format.json()),
  level: level ? level : process?.env?.LOG_LEVEL,
  colorize: true,
  transports: transportsList,
});

export const logger = createLogger(expressWinstonConfig());
