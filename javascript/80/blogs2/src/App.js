import React, { Component } from 'react';
import './App.css';
import BlogList from './BlogList';
import Test from './Test';
import Header from './Header';
import Blog from './Blog';
import { Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  state = {
    jackpot: 100000000
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/blogs" component={BlogList} />
          <Route path="/test" render={() => <Test jackpot={this.state.jackpot} />} />
          <Route path="/blog/:blogId" component={Blog} />
          <Redirect exact from="/" to="/blogs" />
          <Route render={() => <h1 style={{ color: 'red' }}>No such page</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
