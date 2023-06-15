import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { BadRequestError, InternalServerError, UnauthorizedError } from '../types/errors';
import { AuthResponse } from '../types/response';
import { User } from '../types/users';
import { config } from '../../config/index';
import {dbQuery} from './DbService';

const LOG_SOURCE = 'AuthService';
const accessTokenSecret = config.auth.accessTokenSecret as string;
const refreshTokenSecret = config.auth.refreshTokenSecret as string;
const expiresIn = config.auth.expiresIn as string;
export let refreshTokens: Array<String> = [];

export const registerAction = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    let registerActionMessage = 'User registered';

    const dbResp = await dbQuery({text: 'SELECT * FROM users'})

    if (dbResp.rows.find((u) => u.name === name)) {
      registerActionMessage = 'User already registered';

      throw new BadRequestError({ logSource: LOG_SOURCE, description: registerActionMessage})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbQuery({text: 'INSERT INTO users (name, password) VALUES ($1, $2)', values: [name, hashedPassword]})

    return {
      status: 200,
      description: registerActionMessage,
    };
  } catch (e) {
    throw e
  }
};

export const loginAction = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    let loginActionMessage = 'User authenticated';

    const dbResp = await dbQuery({text: 'SELECT * FROM users WHERE name = $1', values: [name]})
    
    if (!dbResp.rows.find((u) => u.name === name)) {
      loginActionMessage = 'User not registered';
      throw new UnauthorizedError({ logSource: LOG_SOURCE, description: loginActionMessage})
    }

    const storedUser = dbResp.rows.find((u) => u.name === name) as User;

    if (!(await bcrypt.compare(password, storedUser.password))) {
      loginActionMessage = 'Wrong password';
      throw new UnauthorizedError({ logSource: LOG_SOURCE, description: loginActionMessage})
    }

    const accessToken = jwt.sign({storedUser}, accessTokenSecret, { expiresIn: expiresIn });
    const refreshToken = jwt.sign({storedUser}, refreshTokenSecret);
    refreshTokens.push(refreshToken);


    return {
      status: 200,
      description: loginActionMessage,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: expiresIn 
    };
  } catch (e) {
    throw e
  }
};

export const refreshAccessTokenAction = async (user: User): Promise<AuthResponse> => {
  try {
    const accessToken = jwt.sign({user}, accessTokenSecret, { expiresIn: expiresIn });
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
