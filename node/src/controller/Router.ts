import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { testErrorRoute, testRoute } from './Controller';

const router = Router();

router.get('/testGet', asyncHandler(testRoute('GET')));
router.post('/testPost', asyncHandler(testRoute('POST')));
router.get('/testError', testErrorRoute);

export default router;
