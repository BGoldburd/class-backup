import React from 'react';
import { Link } from 'react-router-dom';

/*
return (<ul>{
        props.recipes.map(recipe => <li key={recipe.id}
            onClick={event => props.onRecipeSelection(recipe)}><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></li>)}
    </ul>);
*/

const RecipeList = props => {
    return (<ul>{
        props.recipes.map(recipe => <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
        </li>)}
    </ul>);
}

export default RecipeList;