// importing external packages
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/user.route.js";

// loading environment variables
dotenv.config();

// creating an express app
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable Cors
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// allows to accept cookies in the request
app.use(cookieParser());
// allows to accept json data in the request body
app.use(express.json());
//
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/users", userRoutes);

// starting the server
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ' + PORT);
});
