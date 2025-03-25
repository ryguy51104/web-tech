import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../services/recipeService";
import styles from '../styles/Recipe.module.css';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipeById(id)
            .then((data) => {
                console.log("Recipe data:", data);
                setRecipe(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading recipe details...</p>;
    if (!recipe) return <p>Recipe not found.</p>;

    return (
        <div className={styles.recipe}>
            <div className={styles.header}>
                <h1>{recipe.title}</h1>
                <div className={styles.summary}>
                    <h3>Dietary Info</h3>
                    <p>Vegetarian: {recipe.vegetarian ? "Yes" : "No"}</p>
                    <p>Vegan: {recipe.vegan ? "Yes" : "No"}</p>
                    <p>Gluten-Free: {recipe.glutenFree ? "Yes" : "No"}</p>
                    <p>Dairy-Free: {recipe.dairyFree ? "Yes" : "No"}</p>
                </div>
                <img src={recipe.image} alt={recipe.title} />
            </div>
            <div className={styles.info}>
                <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
            </div>

            <h3>Ingredients</h3>
            <ul className={styles.ingredientlist}>
                {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <ol className={styles.instructionlist}>
                {recipe.analyzedInstructions[0]?.steps.map((step) => (
                    <li key={step.number}>{step.step}</li>
                ))}
            </ol>
        </div >

    );
};

export default Recipe;

