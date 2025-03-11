const express = require('express');
const router = express.Router();
const { fetchRecipes } = require('../api/spoonacular');

router.get('/recipes', async (req, res) => {
    try {
        const filters = {
            diet: req.query.diet,
            intolerances: req.query.intolerances,
            query: req.query.query,
            number: req.query.number || 10
        };
        const data = await fetchRecipes(filters);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

module.exports = router;
