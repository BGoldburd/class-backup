import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import Posts from './Posts';
import AddPost from './AddPost';
import Login from './Login';
import Logout from './Logout';

class App extends Component {
    state = {};

    render() {
        return (
            <>
                <div className="errors">{this.state.error}</div>
                <header>
                    {this.state.user ? <Logout user={this.state.user} onLogout={this.logout} /> : <Login onLogin={this.login} onRegister={this.register} />}
                    <h1>React Mongo Socket IO Blog</h1>
                    <h2>Welcome to the blog</h2>
                    <Link to="/">Home</Link> <Link to="/addPost">Add Post</Link>
                </header>

                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/addPost/" component={AddPost} />
                    <Route render={props => (<div>404 Not found</div>)} />
                </Switch>
            </>
        );
    }

    login = (name, password) => {
        this.setState({ error: null });
        fetch(`http://127.0.0.1/login/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ name: name, password: password })
        })
            .then(res => {
                if (res.ok) {
                    this.setState({ user: name });
                } else {
                    this.setState({ error: "login failed" });
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ error: err });
            });
    }

    register = (name, password) => {
        this.setState({ error: null });
        fetch(`http://127.0.0.1/register/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ name: name, password: password })
        })
            .then(res => {
                if (!res.ok) {
                    res.text().then(text => {
                        this.setState({ error: `registration failed: ${text}` });
                    });
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ error: err });
            });
    }

    logout = () => {
        fetch('http://127.0.0.1/logout', { credentials: 'include' })
            .then(this.setState({ user: null }))
            .catch(err => console.error(err));
    }
}

export default App;
