import { testAction } from '../service/sampleService';
import { Response, Request, NextFunction } from 'express';
import { BadRequestError, InternalServerError } from '../utils/errors';
import { SchemaError, Validator } from 'jsonschema';

const LOG_SOURCE = 'controller';

export const testRoute =
  (action: string) =>
  async (req: Request, res: Response): Promise<any> => {
    if (action === 'POST') {
      const postSchema = {
        id: 'sampleSchema',
        type: 'object',
        properties: {
          id: { type: 'number' },
          value: { type: 'number' },
          comment: { type: 'string' },
        },
        required: ['id', 'value'],
      };
      const postData = req.body;
      const validateJsonData = new Validator();
      if (validateJsonData.validate(postData, postSchema).errors.length > 0) {
        throw new BadRequestError(LOG_SOURCE, 'JSON data missing');
      }
    }

    const response = await testAction(action);
    return res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(response.status)
      .json({ data: `Response from ${action} action`, status: response.status });
  };

export const testErrorRoute = (req: Request, res: Response, next: NextFunction): Error => {
  throw new InternalServerError(LOG_SOURCE, 'Error from testErrorRoute in Controller');
};
