import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { testRoute } from './Controller';

const router = Router();

router.get('/testGet', asyncHandler(testRoute('GET')));
router.post('/testPost', asyncHandler(testRoute('POST')));

export default router;
