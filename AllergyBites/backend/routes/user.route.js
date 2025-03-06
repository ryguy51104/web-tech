import express from 'express';
import { createUser, changeUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// route to create a new user
router.post('/', createUser);
// change password
router.put('/:id', changeUser);
// route to delete users
router.delete('/:id', deleteUser);

export default router;
