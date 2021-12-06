import bcrypt from 'bcrypt';

import { logger } from '../utils/logger';
import { InternalServerError, UnauthorizedError } from '../utils/errors';
import { AuthResponse, StatusResponse } from '../types/response';
import { User } from '../types/users';

const LOG_SOURCE = 'sampleService';
const users: Array<User> = [];

export const authAction = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    if (!users.find((u) => u.name === name)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ name: name, password: hashedPassword });
      return {
        status: 200,
        description: 'User created',
      };
    } else {
      const storedUser = users.find((u) => u.name === name) as User;
      const isPasswordCorrect = await bcrypt.compare(password, storedUser.password);
      if (!isPasswordCorrect) {
        throw new UnauthorizedError(LOG_SOURCE, 'Invalid credentials');
      }
      return {
        status: 200,
        description: 'User found',
      };
    }
  } catch (e) {
    throw e instanceof Error ? new UnauthorizedError(LOG_SOURCE, 'Invalid cretendials') : new Error(String(e));
  }
};

export const getPostAction = (action: string): StatusResponse => {
  try {
    logger.info('getPostAtion finished', { source: LOG_SOURCE, method: action });
    return {
      status: 200,
    };
  } catch (e) {
    throw e instanceof Error ? new InternalServerError(LOG_SOURCE, e.message) : new Error(String(e));
  }
};
