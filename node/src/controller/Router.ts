import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { loginRoute, errorRoute, getPostActionRoute } from './Controller';
import authMiddleware from '../Middleware/AuthMiddleware';

const router = Router();

router.get('/loginAction', authMiddleware, asyncHandler(loginRoute));
router.get('/getAction', authMiddleware, asyncHandler(getPostActionRoute('GET')));
router.post('/postAction', authMiddleware, asyncHandler(getPostActionRoute('POST')));
router.get('/error', errorRoute);

export default router;
