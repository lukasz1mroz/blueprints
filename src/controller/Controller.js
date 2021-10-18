import { Request, Response } from "express";
import { testAction } from "../service/sampleService";

export const testRoute = async (req, res) => {
  const response = await testAction();

  return res.status(response.status).json({ data: "Response received", status: response.status });
};
