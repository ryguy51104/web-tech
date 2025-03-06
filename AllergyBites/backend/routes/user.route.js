import express from 'express';
import { register, login, changeUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// route to create a new user
router.post('/register', register);
// route to login
router.post('/login', login);
// change password
router.put('/:id', changeUser);
// route to delete users
router.delete('/:id', deleteUser);

export default router;
