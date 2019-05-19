import RecipeListView from '../views/RecipeListView';
import { Container } from 'flux/utils';
import RecipeStore from '../data/RecipeStore';

function getStores() {
    return [
        RecipeStore,
    ];
}

function getState() {
    return {
        recipes: RecipeStore.getState(),
    };
}

export default Container.createFunctional(RecipeListView, getStores, getState);