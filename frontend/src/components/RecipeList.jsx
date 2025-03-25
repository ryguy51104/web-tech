import { useNavigate } from 'react-router-dom';
import React from 'react';
import styles from '../styles/Recipes.module.css';

const RecipeList = ({ recipes }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.list}>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map((recipe) => (
                        <li onClick={() => navigate(`/recipe/${recipe.id}`)}
                            key={recipe.id}>
                            <h2>{recipe.title}</h2>
                            <img src={recipe.image} alt={recipe.title} width="100" />
                            <h3>Summary:</h3>
                            <div> <div
                                dangerouslySetInnerHTML={{ __html: recipe.summary }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            /></div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p></p>
            )}
        </div>
    );
}

export default RecipeList;
