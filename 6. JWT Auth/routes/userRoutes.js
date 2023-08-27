import express from 'express';
import { registerUser, loginUser, isAuthenticated } from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser).get(isAuthenticated);
router.route('/login').post(loginUser);

export default router;