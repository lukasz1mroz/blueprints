import { testAction } from "../service/sampleService.js";

export const testRoute = async (req, res) => {
  const response = await testAction();

  return res.status(response.status).json({ data: "Response received", status: response.status });
};
