import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
        <div>
            {recipes.length > 0 ? (
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} width="100"/>
                        <div><strong>Summary:</strong></div>
                        <p> <div 
                                dangerouslySetInnerHTML={{ __html: recipe.summary }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            /></p>
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
