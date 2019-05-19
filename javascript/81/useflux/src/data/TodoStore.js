import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';
import Todo from './Todo.js';

class TodoStore extends ReduceStore {
    constructor() {
        super(TodoDispatcher);
        this.nextId = 1;
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case TodoActionTypes.ADD_TODO:
                // Don't add todos with no text.
                if (!action.text) {
                    return state;
                }
                const id = this.nextId++;
                return state.set(id, new Todo({
                    id,
                    text: action.text,
                    complete: false
                }));

            default:
                return state;
        }
    }
}

export default new TodoStore();