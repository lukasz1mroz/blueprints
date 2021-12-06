type StatusResponse = {
  status: number;
};

type AuthResponse = StatusResponse & {
  description: string;
};

export { StatusResponse, AuthResponse };
