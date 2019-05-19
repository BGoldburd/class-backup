import React, { Component } from 'react';
import './AddComment.css';

export default class Login extends Component {
    render() {
        return (
            <form style={{ textAlign: 'center' }} onSubmit={this.submit}>
                <input ref="name" placeholder="name"></input>
                <input type="password" ref="password" placeholder="password"></input>
                <button onClick={this.handleLogin}>login</button>
                <button onClick={this.handleRegister}>register</button>
            </form>
        );
    }

    handleLogin = () => {
        this.props.onLogin(this.refs.name.value, this.refs.password.value)
        this.refs.name.value = '';
        this.refs.password.value = '';
    }

    handleRegister = () => {
        this.props.onRegister(this.refs.name.value, this.refs.password.value)
        this.refs.name.value = '';
        this.refs.password.value = '';
    }

    submit = (e) => {
        e.preventDefault();
    }
}
