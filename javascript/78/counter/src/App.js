import React, { Component } from 'react';
import Counters from './Counters';
import Total from './Total';

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 0 }
    ]
  };

  handleIncrementCounter = counter => {
    // not quite right
    //counter.value++;
    //this.setState({ counters: this.state.counters });

    // better - all changes are in new objects
    const newCounterArray = [...this.state.counters];
    const newCounter = { ...counter };
    newCounter.value++;
    newCounterArray[newCounterArray.indexOf(counter)] = newCounter;
    this.setState({ counters: newCounterArray });
  }

  handleDecrementCounter = counter => {
    const newCounterArray = [...this.state.counters];
    const newCounter = { ...counter };
    newCounter.value--;
    newCounterArray[newCounterArray.indexOf(counter)] = newCounter;
    this.setState({ counters: newCounterArray });
  }

  handleResetCounter = counter => {
    const newCounterArray = [...this.state.counters];
    const newCounter = { ...counter };
    newCounter.value = 0;
    newCounterArray[newCounterArray.indexOf(counter)] = newCounter;
    this.setState({ counters: newCounterArray });
  }

  handleDeleteCounter = counter => {
    const newCounterArray = this.state.counters.filter(c => c !== counter);
    this.setState({ counters: newCounterArray });
  }

  handleResetAllCounters = counter => {
    const newCounterArray = this.state.counters.map(c => ({ ...c, value: 0 }));
    this.setState({ counters: newCounterArray });
  }

  render() {
    return (
      <div>
        <Total total={
          this.state.counters.reduce((acc, cv) => acc + cv.value, 0)} />
        <button onClick={this.handleResetAllCounters}>reset</button>
        <Counters counters={this.state.counters}
          onIncrement={this.handleIncrementCounter}
          onDecrement={this.handleDecrementCounter}
          onDelete={this.handleDeleteCounter}
          onReset={this.handleResetCounter} />
      </div>
    );
  }
}

export default App;
