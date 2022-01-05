import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { loginRoute, tokenRoute, errorRoute, getActionRoute, postActionRoute } from './Controller';
import authMiddleware from '../middleware/AuthMiddleware';

const router = Router();

router.get('/login', authMiddleware, asyncHandler(loginRoute));
router.post('/token', authMiddleware, asyncHandler(tokenRoute));
router.delete('/token', authMiddleware, asyncHandler(tokenRoute));
router.get('/getPosts', authMiddleware, asyncHandler(getActionRoute));
router.get('/getPost/:postId', authMiddleware, asyncHandler(getActionRoute));
router.post('/post', authMiddleware, asyncHandler(postActionRoute));
router.get('/error', errorRoute);

export default router;
