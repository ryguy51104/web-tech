import User from '../models/user.model.js'; // Ensure your model is defined

// Function to add a user
export const addUser = async (req, res) => {
  const { firstName, lastName, email, password, age } = req.body;

  if (!firstName || !lastName || !email || !password || !age) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      age,
    });

    await newUser.save(); // Save to database
    res.status(201).json({ message: 'User added successfully', newUser });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Server error, unable to add user' });
  }
};
