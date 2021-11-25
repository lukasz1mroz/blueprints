import { testAction } from '../service/sampleService';
import { Response, Request } from 'express';

export const testRoute =
  (action: string) =>
  async (req: Request, res: Response): Promise<any> => {
    const response = await testAction(action);
    return res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(response.status)
      .json({ data: `response from ${action} action`, status: response.status });
  };
