import winston from "winston";

const expressWinstonConfig = {
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
  colorize: true,
};

export const logger = winston.createLogger(expressWinstonConfig);
