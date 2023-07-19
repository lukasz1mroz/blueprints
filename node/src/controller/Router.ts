import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { userRoute, tokenRoute, errorRoute, getActionRoute, postActionRoute, pingRoute } from './Controller';
import authMiddleware from '../middleware/AuthMiddleware';
import logMiddleware from '../middleware/LogMiddleware';

const router = Router();

router.post('/api/register', logMiddleware, authMiddleware, asyncHandler(userRoute));
router.get('/api/login', logMiddleware, authMiddleware, asyncHandler(userRoute));
router.get('/api/refreshToken', logMiddleware, authMiddleware, asyncHandler(tokenRoute));
router.delete('/api/removeToken', logMiddleware, authMiddleware, asyncHandler(tokenRoute));
router.get('/api/getPosts', logMiddleware, authMiddleware, asyncHandler(getActionRoute));
router.get('/api/getPost/:postId', logMiddleware, authMiddleware, asyncHandler(getActionRoute));
router.post('/api/post', logMiddleware, authMiddleware, asyncHandler(postActionRoute));
router.get('/api/error', logMiddleware, errorRoute);
router.get('/api/ping', pingRoute);

export default router;
