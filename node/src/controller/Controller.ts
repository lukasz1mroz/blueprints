import { Response, Request, NextFunction } from 'express';

import { User } from '../types/users';
import { getPostAction } from '../service/ActionService';
import { loginAction, tokenRefreshAction } from '../service/AuthService';
import { InternalServerError } from '../utils/errors';
import { validateJSONData } from '../utils/validators';
import { RequestWithUser } from 'src/types/request';
import { HEADER_AUTHORIZATION } from 'src/utils/constants';

const LOG_SOURCE = 'controller';

export const loginRoute = async (req: RequestWithUser, res: Response): Promise<any> => {
  const user = req.user as User;
  const response = await loginAction(user.name, user.password);
  return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
};

export const tokenRoute = async (req: RequestWithUser, res: Response): Promise<any> => {
  const user = req.user as User;
  const response = await tokenRefreshAction(user);
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
