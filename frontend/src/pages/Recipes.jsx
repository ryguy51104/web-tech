import React, { useState } from 'react';
import RecipeFilter from '../components/RecipeFilter.jsx';
import RecipeList from '../components/RecipeList.jsx';
import styles from '../styles/Recipes.module.css';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    return (
        <div className={styles.recipes}>
            <div className={styles.card}>
                <RecipeFilter setRecipes={setRecipes} />
                <RecipeList recipes={recipes} />
            </div>
        </div>
    );
};

export default Recipes;
