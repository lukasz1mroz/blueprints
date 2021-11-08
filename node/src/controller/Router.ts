import asyncHandler from "express-async-handler";
import { Router } from "express";
import { testRoute } from "./Controller";

const router = Router();

router.get("/test", asyncHandler(testRoute));

export default router;
