// importing external packages
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

// loading environment variables
dotenv.config();

// creating an express app
const app = express();

// allows to accept json data in the request body
app.use(express.json());

// route to create a new user
app.post('/api/users', async (req, res) => {
    // getting the user data from the request
    const user = req.body;

    // checking if the user data is valid
    if(!user.username || !user.password) {
        res.status(400).send('Username and password are required');
    }

    try {
        const existingUser = await User.findOne({ username: user.username });
        if(existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists'});
        }
        // creating a new user
        const newUser = new User(user);
        // saving the user to the database
        await newUser.save();
        
        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Error while creating user", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// starting the server
app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});
