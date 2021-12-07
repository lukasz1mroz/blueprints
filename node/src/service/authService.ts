import bcrypt from 'bcrypt';

import { InternalServerError } from '../utils/errors';
import { AuthResponse } from '../types/response';
import { User } from '../types/users';

const LOG_SOURCE = 'authService';
const users: Array<User> = [];

export const authAction = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    const storedUser = users.find((u) => u.name === name) as User;

    if (!storedUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ name: name, password: hashedPassword });
      return {
        status: 200,
        description: 'User created',
      };
    }
    if (!(await bcrypt.compare(password, storedUser.password))) {
      return {
        status: 401,
        description: 'Wrong password',
      };
    }
    return {
      status: 200,
      description: 'User authenticated',
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'Internal Server Error');
  }
};
