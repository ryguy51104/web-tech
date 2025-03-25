import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000/api/spoonacular';

/**
 * Fetch recipes from the backend.
 * @param {Object} filters - Dietary filters.
 * @returns {Promise<Object>}
 */
export async function fetchRecipes(filters) {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes`, { params: filters });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw new Error("Failed to fetch recipes.");
    }
}

export async function fetchRecipeById(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipe/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching recipe by id:", error);
        throw new Error("Failed to fetch recipe.");
    }
}
