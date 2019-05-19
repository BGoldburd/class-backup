import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Posts from './Posts';
import AddPost from './AddPost';
import Login from './Login';
import Logout from './Logout';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        {this.state.user ? <Logout user={this.state.user} onLogout={this.logout} /> :
          <Login onLogin={this.login} onRegister={this.register} />}
        <Header />

        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/addPost" component={AddPost} />
          <Route render={() => <div class="error">404, no such page :(</div>} />
        </Switch>
      </>
    );
  }

  login = (name, password) => {
    fetch(`http://127.0.0.1/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    }).then(res => {
      if (res.ok) {
        this.setState({
          user: name
        });
      } else {
        console.error('failed to login');
      }
    })
  };

  register = (name, password) => {

  };

  logout = () => {

  }
}

export default App;
