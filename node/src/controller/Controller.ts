import { authAction, getPostAction } from '../service/service';
import { Response, Request, NextFunction } from 'express';
import { BadRequestError, InternalServerError } from '../utils/errors';
import { Validator } from 'jsonschema';

const LOG_SOURCE = 'controller';
const validateData = (data: any, schema: any) => {
  const validateJsonData = new Validator();
  if (validateJsonData.validate(data, schema).errors.length > 0) {
    throw new BadRequestError(LOG_SOURCE, 'JSON data missing');
  }
};

const prepareResponse = (response: any, res: Response, action?: string) => {
  return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .status(response.status)
    .json({ data: `Response from ${action} action`, status: response.status, description: response.description });
};

export const authRoute = async (req: Request, res: Response): Promise<any> => {
  const authSchema = {
    id: 'authSchema',
    type: 'object',
    properties: {
      name: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['name', 'password'],
  };
  validateData(req.body, authSchema);
  const response = await authAction(req.body.name, req.body.password);
  prepareResponse(response, res, 'auth');
};

export const getPostActionRoute =
  (action: string) =>
  async (req: Request, res: Response): Promise<any> => {
    if (action === 'POST') {
      const postSchema = {
        id: 'postSchema',
        type: 'object',
        properties: {
          id: { type: 'number' },
          value: { type: 'number' },
          comment: { type: 'string' },
        },
        required: ['id', 'value'],
      };
      validateData(req.body, postSchema);
    }

    const response = await getPostAction(action);
    prepareResponse(response, res, action);
  };

export const errorRoute = (req: Request, res: Response, next: NextFunction): Error => {
  throw new InternalServerError(LOG_SOURCE, 'Error from testErrorRoute in Controller');
};
