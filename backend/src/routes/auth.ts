import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { loginUser } from '../controllers/authController';

const router = Router();

router.post('/login', asyncHandler(loginUser));

export default router;
