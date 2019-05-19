import React, { Component } from 'react';

export default class RegistrationForm extends Component {
    state = {
        name: 'Donald',
        email: 'dtrump@whitehouse.gov'
    };

    /*handleNameChange = event => {
        console.log('handleNameChange');
        this.setState({
            name: event.target.value
        });
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };*/

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        /*const newState = {};
        newState[name] = value;*/

        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        alert(`${this.state.name} at ${this.state.email} has been registered. You should begin receiving spam shortly`)
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name: <input name="name" onChange={/*this.handleNameChange*/ this.handleInputChange} value={this.state.name} /></label>
                <label>Email: <input name="email" type="email" onChange={/*this.handleEmailChange*/ this.handleInputChange} value={this.state.email} /></label>
                <button>register!</button>
            </form>
        );
    }
}