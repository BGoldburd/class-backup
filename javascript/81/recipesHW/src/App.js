import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';
import Header from './Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddRecipe from './AddRecipe';

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

  /*handleRecipeSelection = recipe => {
    this.setState({
      selectedRecipe: recipe
    });
  }*/

  handleAddRecipe = recipe => {
    recipe.id = this.state.recipes.length + 1;
    this.setState({
      recipes: [...this.state.recipes, recipe]
    });

    setTimeout(() => console.log(this.state), 1000);
  }

  render() {
    /*
    <Route path="/recipes" render={() => <RecipeList recipes={this.state.recipes} onRecipeSelection={this.handleRecipeSelection} />} />
    <Route path="/recipe" render={() => <RecipeDetails recipe={this.state.selectedRecipe} />} />
    */
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/recipes" render={() => <RecipeList recipes={this.state.recipes} />} />
          <Route path="/recipe/:recipeId" render={routeProps => <RecipeDetails recipe={this.state.recipes.find(r => r.id === +routeProps.match.params.recipeId)} />} />
          <Route path="/addRecipe" render={routeProps => <AddRecipe onAddRecipe={this.handleAddRecipe} {...routeProps} />} />
          <Redirect to="/recipes" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
