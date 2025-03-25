import express from 'express';
const router = express.Router();
import { getRecipes, getRecipeById } from '../utils/spoonacular.js';

router.get('/recipes', async (req, res) => {
    try {
        const filters = {
            diet: req.query.diet,
            intolerances: req.query.intolerances,
            query: req.query.query,
            number: req.query.number || 10
        };

        console.log("Received filters:", filters);

        const data = await getRecipes(filters);
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch recipes' });
    }
});

router.get('/recipe/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Received id:", id);

        const data = await getRecipeById(id);
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch recipe' });
    }
});

export default router;
