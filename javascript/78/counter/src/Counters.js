import React, { Component } from 'react';
import Counter from './Counter';

class Counters extends Component {
    /*state = {
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
    }*/

    render() {
        return (
            <div>
                {/*this.state*/this.props.counters.map(counter => <Counter counter={counter}
                    onIncrement={/*this.handleIncrementCounter*/this.props.onIncrement}
                    onDecrement={this.props.onDecrement}
                    onDelete={this.props.onDelete}
                    onReset={this.props.onReset} />)}
            </div>
        );
    }
}

export default Counters;