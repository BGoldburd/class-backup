import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <form onSubmit={this.submit}>
                <input placeholder="name" ref="name" />
                <input type="password" placeholder="password" ref="password"></input>
                <button onClick={this.login}>login</button>
                <button onClick={this.register}>register</button>
            </form>
        );
    }

    login = e => {
        this.props.onLogin(this.refs.name.value, this.refs.password.value);
        this.refs.name.value = '';
        this.refs.password.value = '';
    }

    register = e => {
        this.props.onRegister(this.refs.name.value, this.refs.password.value);
        this.refs.name.value = '';
        this.refs.password.value = '';
    }

    // chrome warns if use password not in form...
    submit = e => {
        e.preventDefault();
    }
}
