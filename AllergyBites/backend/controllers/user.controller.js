import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    // getting the user data from the request
    const user = req.body;
    // transform the username to lowercase
    const username = user.username.toLowerCase();
    user.username = username;

    // checking if the user data is valid
    if (!user.username || !user.password || !user.confirmPassword) {
        // sending a response
        return res.status(400).send('Username and password are required');
    }
    // checking if the password and confirm password are the same
    if (user.password !== user.confirmPassword) {
        // sending a response
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) {
            // sending a response
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // creating a new user
        const newUser = new User(user);
        // saving the user to the database
        await newUser.save();

        // sending a response
        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Error while creating user", error);
        // sending a response
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const login = async (req, res) => {
    // getting the username and password from the request body
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    // checking if the username and password are valid
    const user = await User.findOne({ username });
    if (!user) {
        // sending a response
        return res.status(400).json({ success:false, message: 'User not found' });
    }

    // checking if the password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        // sending a response
        return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // creating a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // setting cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'Lax',
        maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: 'Login successful' });
}

export const logout = async (req, res) => {
    // clear cookies json web token to logout
    res.clearCookie('jwt');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};


export const changePassword = async (req, res) => {
    try {
        // Get user ID from JWT token
        const id = req.user.id;

        // Get old and new password from request body
        const { oldPassword, newPassword } = req.body;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid user ID" });
        }

        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Old password is incorrect" });
        }

        // check if new password is the same as the old password
        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame) {
            return res.status(400).json({ success: false, message: 'New password cannot be the same as the old one' });
        }

        // Hash new password
        user.password = newPassword;

        // Save updated user
        await user.save();

        // update the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.clearCookie('jwt');
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000,
        });


        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


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
            // sending a response
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // sending a response
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        // sending a response
        res.status(500).json({ success: false, message: "Servererror" });
    }
}

export const getProfile = async (req, res) => {
    try {
        // Fetch user from database
        const user = await User.findById(req.user.id).select("-password");

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
