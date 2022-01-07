import axios from 'axios';
import { CustomError } from '../types/errors';

export const asyncErrorHandler = (logSource: string, e?: any) => {
  const error = axios.isAxiosError(e)
    ? new CustomError({
        name: 'Axios error',
        httpCode: e.response?.status as number,
        logSource: logSource,
        details: e.response?.data,
        url: e.config.url,
      })
    : e;
  throw error;
};
