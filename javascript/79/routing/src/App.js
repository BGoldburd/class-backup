import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './About';
import Contacts from './Contacts';
import Home from './Home';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <h1>PCS Great APP</h1>
        <Navbar />
        <hr />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />

          <Route render={() => <h1>404!</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
