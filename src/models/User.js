const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dietaryPreferences: [String],  // ['gluten-free', 'vegan', 'dairy-free']
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  savedRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
