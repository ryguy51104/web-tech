const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/restaurants", restaurantRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the AllergyBites API!");
});

module.exports = app;
