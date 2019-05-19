import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Posts from './Posts';
import AddPost from './AddPost';

class App extends Component {
  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/addPost" component={AddPost} />
          <Route render={() => <div class="error">404, no such page :(</div>} />
        </Switch>
      </>
    );
  }
}

export default App;
