// importing external packages
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

import userRoutes from "./routes/user.route.js";

// loading environment variables
dotenv.config();

// creating an express app
const app = express();
const PORT = process.env.PORT || 5000;
// Enable Cors
app.use(cors());

// allows to accept json data in the request body
app.use(express.json());

app.use("/api/users", userRoutes);

// starting the server
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ' + PORT);
});
