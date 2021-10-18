import { Router } from "express";
import asyncHandler from "express-asyng-handler";
import { testRoute } from "./Controller";

const router = Router();

router.get("/test", asyncHandler(testRoute));

export default router;
