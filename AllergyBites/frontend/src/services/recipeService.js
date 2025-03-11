import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

/**
 * Fetch recipes from the backend.
 * @param {Object} filters - Dietary filters.
 * @returns {Promise<Object>}
 */
export async function fetchRecipes(filters) {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes/search`, { params: filters });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw new Error("Failed to fetch recipes.");
    }
}
