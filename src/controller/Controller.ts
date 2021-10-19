import { testAction } from "../service/sampleService";
import { Response, Request } from "express";

export const testRoute = async (req: Request, res: Response): Promise<any> => {
  const response = await testAction();

  return res.status(response.status).json({ data: "Response received", status: response.status });
};
