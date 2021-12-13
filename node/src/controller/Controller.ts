import { Response, Request, NextFunction } from 'express';

import { User } from '../types/users';
import { getAction, postAction } from '../service/ActionService';
import { loginAction, refreshAccessTokenAction, revokeRefreshTokenAction } from '../service/AuthService';
import { InternalServerError } from '../types/errors';
import { validateJSONData } from '../utils/validators';
import { RequestWithUser } from '../types/request';
import { HEADER_AUTHORIZATION } from '../utils/constants';

const LOG_SOURCE = 'Controller';

export const loginRoute = async (req: RequestWithUser, res: Response): Promise<any> => {
  const user = req.user as User;
  const response = await loginAction(user.name, user.password);
  return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
};

export const tokenRoute = async (req: RequestWithUser, res: Response): Promise<any> => {
  if (req.method === 'DELETE') {
    const token = req.headers[HEADER_AUTHORIZATION]?.split(' ')[1] as string;
    const response = await revokeRefreshTokenAction(token);
    return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
  }
  const user = req.user as User;
  const response = await refreshAccessTokenAction(user);
  return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
};

export const getActionRoute = async (req: RequestWithUser, res: Response): Promise<any> => {
  const response = await getAction(req.params.postId);
  return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
};

export const postActionRoute = async (req: RequestWithUser, res: Response): Promise<any> => {
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

  const response = await postAction();
  return res.setHeader('Access-Control-Allow-Origin', '*').status(response.status).json(response);
};

export const errorRoute = (req: Request, res: Response, next: NextFunction): Error => {
  throw new InternalServerError({ logSource: LOG_SOURCE, description: 'Error from testErrorRoute in Controller' });
};
