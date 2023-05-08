import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { userRoute, tokenRoute, errorRoute, getActionRoute, postActionRoute } from './Controller';
import authMiddleware from '../middleware/AuthMiddleware';
import logMiddleware from '../middleware/LogMiddleware';

const router = Router();

router.post('/register', logMiddleware, authMiddleware, asyncHandler(userRoute));
router.get('/login', logMiddleware, authMiddleware, asyncHandler(userRoute));
router.get('/refreshToken', logMiddleware, authMiddleware, asyncHandler(tokenRoute));
router.delete('/removeToken', logMiddleware, authMiddleware, asyncHandler(tokenRoute));
router.get('/getPosts', logMiddleware, authMiddleware, asyncHandler(getActionRoute));
router.get('/getPost/:postId', logMiddleware, authMiddleware, asyncHandler(getActionRoute));
router.post('/post', logMiddleware, authMiddleware, asyncHandler(postActionRoute));
router.get('/error', logMiddleware, errorRoute);

export default router;
