import React, { Component } from 'react';
import './AddRecipe.css';

class AddRecipe extends Component {
    state = {
        name: '',
        picture: '',
        ingredients: '',
        directions: ''
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        this.props.onAddRecipe({
            name: this.state.name,
            picture: this.state.picture,
            ingredients: this.state.ingredients.split(','),
            directions: this.state.directions.split(',')
        })
        console.log(this.props);
        this.props.history.push('/recipes');
        event.preventDefault();
    };

    render() {
        return (
            <form className="addRecipeForm" onSubmit={this.handleSubmit}>
                <label>Name: <input name="name" onChange={this.handleInputChange} value={this.state.name} /></label>
                <label>Picture: <input name="picture" onChange={this.handleInputChange} value={this.state.picture} /></label>
                <label>Ingredients (comma delimited): <input name="ingredients" onChange={this.handleInputChange} value={this.state.ingredients} /></label>
                <label>Directions (comma delimited): <textarea name="directions" onChange={this.handleInputChange} value={this.state.directions} /></label>
                <button>add recipe</button>
            </form>
        )
    }
}

export default AddRecipe;