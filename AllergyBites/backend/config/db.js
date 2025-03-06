// importing external packages
import mongoose from "mongoose";

// async function to connect to the database
export const connectDB = async () => {
    // try catch block to handle errors
    try {
        // connecting to the database
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // printing the connection host
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // if there is an error, print the error message
    } catch (error) {
        // printing the error message
        console.error(`Error: ${error.message}`);
        // exiting the process with error code
        process.exit(1);
    }
}
