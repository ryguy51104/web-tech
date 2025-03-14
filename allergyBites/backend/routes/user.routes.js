import express from "express";
import { register } from "../controllers/user.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";


const router = express.Router();

// Register a new user
router.post("/register", register);

router.get("/", getAllUsers);


// Get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Return the users as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve users', error });
  }
});

export default router;
