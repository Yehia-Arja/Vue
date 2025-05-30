import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { loginUser, verifyTokenController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', asyncHandler(loginUser));

// Add this route for token verification
router.get('/verify-token', authenticate, asyncHandler(verifyTokenController));

export default router;
