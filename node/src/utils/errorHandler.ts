import { logger } from "./logger";
import { Request, Response } from "express";

export const returnError = (err: any, req: Request, res: Response, next: any) => {
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
