import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    // getting the user data from the request
    const user = req.body;

    // checking if the user data is valid
    if (!user.username || !user.password) {
        res.status(400).send('Username and password are required');
    }

    try {
        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
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
}

export const login = async (req, res) => {
    // getting the username and password from the request body
    const { username, password } = req.body;

    // checking if the username and password are valid
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // checking if the password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // creating a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
}

export const changeUser = async (req, res) => {

    // get id from request parameters
    const { id } = req.params;

    // get password from request body
    const { password } = req.body;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    // change password
    try {
        // find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // updating and hashing the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ success: true, data: user, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteUser = async (req, res) => {

    // get id from parameters
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    // try deleting user with id
    try {
        // check if user exists
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Servererror" });
    }

}
