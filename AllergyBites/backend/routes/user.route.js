import express from 'express';
import { register, login, changePassword, logout, deleteUser, getProfile } from "../controllers/user.controller.js";
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// route to create a new user
router.post('/register', register);
// route to login
router.post('/login', login);
// change password
router.put('/change-password', authMiddleware, changePassword);
// route to delete users
router.delete('/:id', deleteUser);
// profile
router.get('/profile', authMiddleware, getProfile);
// logout
router.post('/logout', logout);

export default router;
