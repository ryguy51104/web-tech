const express = require("express");
const { createRecipe, getRecipes, deleteRecipe } = require("../controllers/recipeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createRecipe);
router.get("/", getRecipes);
router.delete("/:id", authMiddleware, deleteRecipe);

module.exports = router;
