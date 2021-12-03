import { testAction } from '../service/sampleService';
import { Response, Request, NextFunction } from 'express';
import { InternalServerError } from '../utils/errors';

const LOG_SOURCE = 'controller';

export const testRoute =
  (action: string) =>
  async (req: Request, res: Response): Promise<any> => {
    const response = await testAction(action);
    return res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(response.status)
      .json({ data: `Response from ${action} action`, status: response.status });
  };

export const testErrorRoute = (req: Request, res: Response, next: NextFunction): Error => {
  throw new InternalServerError(LOG_SOURCE, 'Error from testErrorRoute in Controller');
};
