import { getPostAction } from '../service/ActionService';
import { loginAction } from '../service/LoginService';
import { Response, Request, NextFunction } from 'express';
import { InternalServerError } from '../utils/errors';
import { validateJSONData } from '../utils/validators';
import { RequestWithUser } from 'src/types/request';

const LOG_SOURCE = 'controller';

export const loginRoute = async (req: Request, res: Response): Promise<any> => {
  const response = await loginAction(req.body.name, req.body.password);
  return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
};

export const getPostActionRoute =
  (action: string) =>
  async (req: RequestWithUser, res: Response): Promise<any> => {
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
      validateJSONData(req.body, postSchema);
    }

    const response = await getPostAction(action);
    return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
  };

export const errorRoute = (req: Request, res: Response, next: NextFunction): Error => {
  throw new InternalServerError(LOG_SOURCE, 'Error from testErrorRoute in Controller');
};
