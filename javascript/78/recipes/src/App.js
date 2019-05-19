import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';

class App extends Component {
  state = {
    recipes: [
      {
        id: 1,
        name: 'Chicken Soup',
        ingredients: ['chicken', 'vegetables', 'spices', 'water'],
        directions: ['add water to pot', 'add vegetables', 'add chicken', 'add spices', 'bring to rapid boil', 'simmer for 1 and half hours'],
        picture: 'https://whatscookingamerica.net/wp-content/uploads/2017/09/Jewish-Chicken-Soup-closeup-1280x720.jpg'
      },
      {
        id: 2,
        name: 'Chulent',
        ingredients: ['meat', 'potatoes', 'beans', 'spices', 'water'],
        directions: ['add everything to pot', 'cook for at least 10 hours'],
        picture: 'http://1zbu2wo4b4720erk34pts2lh.wpengine.netdna-cdn.com/wp-content/uploads/2015/06/a1.jpg'
      }
    ]
  };

  handleRecipeSelection = (event, recipe) => {
    this.setState({
      selectedRecipe: recipe
    });
  }

  render() {
    const recipeList = <ul>{
      this.state.recipes.map(recipe => <li key={recipe.id}
        onClick={event => this.handleRecipeSelection(event, recipe)}>{recipe.name}</li>)}</ul>

    return (
      <React.Fragment>
        <h1 className="text-center">PCS Recipe App</h1>
        <hr />
        {recipeList}
        <hr />
        <RecipeDetails recipe={this.state.selectedRecipe} />
      </React.Fragment>
    );
  }
}

export default App;
