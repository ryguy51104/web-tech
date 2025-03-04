const express = require("express");
const { createRecipe, getRecipes, deleteRecipe } = require("../controllers/recipeController");

const router = express.Router();

router.post("/", createRecipe);
router.get("/", getRecipes);
router.delete("/:id", deleteRecipe);

module.exports = router;
