import { Router } from "express";
import asyncHandler from "express-async-handler";
import { testRoute } from "./Controller.js";

const router = Router();

router.get("/test", asyncHandler(testRoute));

export default router;
