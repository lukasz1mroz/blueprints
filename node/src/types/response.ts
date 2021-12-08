type GetPostActionResponse = {
  data: string;
  status: number;
};

type AuthResponse = {
  accessToken?: string;
  description: string;
  status: number;
};

export { GetPostActionResponse, AuthResponse };
