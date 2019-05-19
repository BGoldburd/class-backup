import RecipeActionTypes from './RecipeActionTypes';
import RecipeDispatcher from './RecipeDispatcher';

const Actions = {
    addRecipe(recipe) {
        RecipeDispatcher.dispatch({
            type: RecipeActionTypes.ADD_RECIPE,
            recipe,
        });
    }
};

export default Actions;