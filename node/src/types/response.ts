type GetPostActionResponse = {
  data: object | string;
  status: number;
};

type AuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  description: string;
  status: number;
  expiresIn?: string;
};

export { GetPostActionResponse, AuthResponse };
