const axios = require('axios');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

/**
 * Fetch recipes based on dietary filters.
 * @param {Object} filters - The dietary restrictions and search parameters.
 * @returns {Promise<Object>} - Recipe search results.
 */
async function getRecipes(filters) {
    try {
        const response = await axios.get(SPOONACULAR_BASE_URL, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                diet: filters.diet,  // Example: "vegan, vegetarian"
                intolerances: filters.intolerances, // Example: "dairy, gluten"
                query: filters.query, // Search query like "pasta"
                number: filters.number || 10, // Number of recipes to fetch
            },
        });

        return response.data.results;
    } catch (error) {
        console.error("Error fetching recipes:", error.response?.data || error.message);
        throw new Error('Failed to fetch recipes from Spoonacular');
    }
}

module.exports = { getRecipes };
