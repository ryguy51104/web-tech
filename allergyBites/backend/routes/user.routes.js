import express from 'express';
import User from '../models/User.models.js';

const router = express.Router();

// POST endpoint to add new user data to MongoDB
router.post('/add', async (req, res) => {
  const { firstName, lastName, email, password, age } = req.body;

  try {
    // Create a new user document
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Password will be hashed before saving due to the pre-save hook
      age,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'Data added successfully!', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add data', error });
  }
});

export default router;
