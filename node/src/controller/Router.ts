import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { loginRoute, tokenRoute, errorRoute, getPostActionRoute } from './Controller';
import authMiddleware from '../Middleware/AuthMiddleware';

const router = Router();

router.get('/login', authMiddleware, asyncHandler(loginRoute));
router.post('/refreshToken', authMiddleware, asyncHandler(tokenRoute));
router.get('/get', authMiddleware, asyncHandler(getPostActionRoute('GET')));
router.post('/post', authMiddleware, asyncHandler(getPostActionRoute('POST')));
router.get('/error', errorRoute);

export default router;
