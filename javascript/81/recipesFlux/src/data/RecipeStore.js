import { ReduceStore } from 'flux/utils';
import RecipeActionTypes from './RecipeActionTypes';
import RecipeDispatcher from './RecipeDispatcher';

class RecipeStore extends ReduceStore {
    constructor() {
        super(RecipeDispatcher);
    }

    getInitialState() {
        return Object.freeze([]);
    }

    reduce(state, action) {
        switch (action.type) {
            case RecipeActionTypes.ADD_RECIPE:
                // Do nothing for now, we will add logic here soon!
                return state;

            default:
                return state;
        }
    }
}

export default new RecipeStore();