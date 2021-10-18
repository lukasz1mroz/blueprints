import { logger } from "./logger.js";

export const returnError = (err, req, res, next) => {
  const errorObject = {
    description: err.description,
    logSource: err.logSource,
    code: err.code,
    message: err.message,
    level: err.level,
  };

  logger.error(errorObject);
  res.status(errorObject.code || 500).json(errorObject);
};
