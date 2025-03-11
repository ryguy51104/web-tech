import React, { useState } from 'react';
import { fetchRecipes } from '../services/recipeService';

const RecipeFilter = ({ setRecipes }) => {
    const [filters, setFilters] = useState({
        diet: '',
        intolerances: '',
        query: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        try {
            const recipes = await fetchRecipes(filters);
            setRecipes(recipes);
        } catch (error) {
            alert("Error fetching recipes. Please try again.");
        }
    };

    return (
        <div>
            <input type="text" name="query" placeholder="Search recipe" onChange={handleChange} />
            <select name="diet" onChange={handleChange}>
                <option value="">Select Diet</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="paleo">Paleo</option>
                <option value="keto">Keto</option>
            </select>
            <select name="intolerances" onChange={handleChange}>
                <option value="">Select Allergy</option>
                <option value="dairy">Dairy-Free</option>
                <option value="gluten">Gluten-Free</option>
                <option value="peanut">Peanut-Free</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default RecipeFilter;
