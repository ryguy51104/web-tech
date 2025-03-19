import React, { useState } from 'react';
import RecipeFilter from '../components/RecipeFilter.jsx';
import RecipeList from '../components/RecipeList.jsx';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    return (
        <div>
            <h1>Find your Recipe</h1>
            <RecipeFilter setRecipes={setRecipes} />
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default Recipes;
