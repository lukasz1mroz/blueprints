import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { InternalServerError } from '../types/errors';
import { AuthResponse } from '../types/response';
import { User } from '../types/users';
import { config } from '../../config/index';

const LOG_SOURCE = 'AuthService';
const users: Array<User> = [];
const accessTokenSecret = config.auth.accessTokenSecret as string;
const refreshTokenSecret = config.auth.refreshTokenSecret as string;
const expiresIn = config.auth.expiresIn as string;
export let refreshTokens: Array<String> = [];

export const registerAction = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    const registerActionMessage = 'User registered';
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name: name, password: hashedPassword });

    return {
      status: 200,
      description: registerActionMessage,
    };
  } catch (e) {
    throw new InternalServerError({ logSource: LOG_SOURCE, description: 'Internal Server Error', details: { e } });
  }
};

export const loginAction = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    let loginActionMessage = 'User authenticated';
    
    if (!users.find((u) => u.name === name)) {
      loginActionMessage = 'User not registered';
      return {
        status: 401,
        description: loginActionMessage,
      };
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
    // const accessToken = jwt.sign(storedUser, accessTokenSecret);

    console.log('jwtSignUser: ', storedUser)
    const accessToken = jwt.sign(storedUser, accessTokenSecret, { expiresIn: expiresIn });
    const refreshToken = jwt.sign(storedUser, refreshTokenSecret);
    refreshTokens.push(refreshToken);


    return {
      status: 200,
      description: loginActionMessage,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: expiresIn 
    };
  } catch (e) {
    throw new InternalServerError({ logSource: LOG_SOURCE, description: 'Internal Server Error', details: { e } });
  }
};

export const refreshAccessTokenAction = async (user: User): Promise<AuthResponse> => {
  try {
    const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: '10s' });
    return {
      status: 200,
      description: 'Access token refreshed',
      accessToken: accessToken,
    };
  } catch (e) {
    throw new InternalServerError({
      logSource: LOG_SOURCE,
      description: 'refreshAccessTokenAction error',
      details: { e },
    });
  }
};

export const removeRefreshTokenAction = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    return {
      status: 204,
      description: 'Refresh token revoked',
    };
  } catch (e) {
    throw new InternalServerError({
      logSource: LOG_SOURCE,
      description: 'revokeRefreshTokenAction error',
      details: { e },
    });
  }
};
