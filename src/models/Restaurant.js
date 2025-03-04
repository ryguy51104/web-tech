const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  menu: [String],  // List of food items
  dietaryOptions: [String],  // ['vegan', 'gluten-free']
  imageUrl: String,
  ratings: [{ user: mongoose.Schema.Types.ObjectId, rating: Number }],
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", RestaurantSchema);
