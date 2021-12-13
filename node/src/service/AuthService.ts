import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ForbiddenError, InternalServerError } from '../types/errors';
import { AuthResponse } from '../types/response';
import { User } from '../types/users';
import config from '../config/config';

const LOG_SOURCE = 'AuthService';
const users: Array<User> = [];
const accessTokenSecret = config.auth.accessTokenSecret as string;
const refreshTokenSecret = config.auth.refreshTokenSecret as string;
export let refreshTokens: Array<String> = [];

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

    // TODO: Consider moving auth functionality to separate server

    // const accessToken = jwt.sign(storedUser, accessTokenSecret, { expiresIn: '10s' });
    // const refreshToken = jwt.sign(storedUser, refreshTokenSecret);
    // refreshTokens.push(refreshToken);

    const accessToken = jwt.sign(storedUser, accessTokenSecret);

    return {
      status: 200,
      description: loginActionMessage,
      accessToken: accessToken,
      // refreshToken: refreshToken,
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'Internal Server Error');
  }
};

export const refreshAccessTokenAction = async (user: User): Promise<AuthResponse> => {
  try {
    const accessToken = jwt.sign({ name: user }, refreshTokenSecret, { expiresIn: '10s' });
    return {
      status: 200,
      description: 'Access token refreshed',
      accessToken: accessToken,
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'e.message');
  }
};

export const revokeRefreshTokenAction = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    return {
      status: 204,
      description: 'Refresh token revoked',
    };
  } catch (e) {
    throw new InternalServerError(LOG_SOURCE, 'e.message');
  }
};
