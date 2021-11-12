import { testAction } from '../service/sampleService';
import { Response, Request } from 'express';

export const testRoute = async (req: Request, res: Response): Promise<any> => {
  const response = await testAction();
  return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .status(response.status)
    .json({ data: 'response received', status: response.status });
};
