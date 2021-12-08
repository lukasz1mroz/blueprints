import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { InternalServerError } from '../utils/errors';
import { AuthResponse } from '../types/response';
import { User } from '../types/users';
import config from '../config/config';

const LOG_SOURCE = 'authService';
const users: Array<User> = [];
const accessTokenSecret = config.auth.accessTokenSecret as string;

export const loginAction = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    let loginActionMessage = 'User authenticated';

    if (!users.find((u) => u.name === name)) {
      loginActionMessage = 'User added and authenticated';
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ name: name, password: hashedPassword });
    }

    const storedUser = users.find((u) => u.name === name) as User;

    if (!(await bcrypt.compare(password, storedUser.password))) {
      loginActionMessage = 'Wrong password';
      return {
        status: 401,
        description: loginActionMessage,
      };
    }

    const accessToken = jwt.sign(storedUser, accessTokenSecret);

    return {
      status: 200,
      description: loginActionMessage,
      accessToken: accessToken,
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'Internal Server Error');
  }
};
