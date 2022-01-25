import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { loginRoute, tokenRoute, errorRoute, getActionRoute, postActionRoute } from './Controller';
import authMiddleware from '../middleware/AuthMiddleware';
import logMiddleware from '../middleware/LogMiddleware';

const router = Router();

router.get('/login', logMiddleware, authMiddleware, asyncHandler(loginRoute));
router.post('/token', logMiddleware, authMiddleware, asyncHandler(tokenRoute));
router.delete('/token', logMiddleware, authMiddleware, asyncHandler(tokenRoute));
router.get('/getPosts', logMiddleware, authMiddleware, asyncHandler(getActionRoute));
router.get('/getPost/:postId', logMiddleware, authMiddleware, asyncHandler(getActionRoute));
router.post('/post', logMiddleware, authMiddleware, asyncHandler(postActionRoute));
router.get('/error', logMiddleware, errorRoute);

export default router;
