export type LogData = {
  meta: {
    req: {
      url: string;
      headers: Object;
      method: string;
      httpVersion: string;
      originalUrl: string;
      query: Object;
    };
    res: {
      statusCode: number;
    };
    responseTime: number;
  };
  level: string;
  message: string;
  timestamp: string;
};
