import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
        <div>
            {recipes.length > 0 ? (
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <div>{recipe.summary}</div>
                        <img src={recipe.image} alt={recipe.title} width="100"/>
                    </li>
                ))}
            </ul>
            ) : ( 
                <p>No recipes found</p>
            )}
       </div>
    );
}

export default RecipeList;
