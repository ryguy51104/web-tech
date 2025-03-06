// importing external package
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// creating a user schema
const userSchema = new mongoose.Schema({
    // unique identifier for the user
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // password for the user
    password: {
        type: String,
        required: true,
    }
}, {
    // timestamps for creation and updates
    timestamps: true
});

// hashing the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // generating a salt to secure the password
    const salt = await bcrypt.genSalt(10);
    // hashing the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', userSchema);
export default User;
