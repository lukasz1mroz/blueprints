import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { authRoute, errorRoute, getPostActionRoute } from './Controller';

const router = Router();

router.get('/users', asyncHandler(authRoute));
router.get('/getAction', asyncHandler(getPostActionRoute('GET')));
router.post('/postAction', asyncHandler(getPostActionRoute('POST')));
router.get('/error', errorRoute);

export default router;
