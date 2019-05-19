import React, { Component } from 'react';

class Counter extends Component {
    /*state = {
        value: this.props.counter.value
    };*/

    handleIncrement = () => {
        //this.props.counter.value++;
        /*this.setState({
            value: this.state.value + 1
        });*/
        this.props.onIncrement(this.props.counter);
    };

    handleDecrement = () => {
        this.props.onDecrement(this.props.counter);
    };

    handleDelete = () => {
        this.props.onDelete(this.props.counter);
    };

    handleReset = () => {
        this.props.onReset(this.props.counter);
    };

    render() {
        return (
            <div>
                <span>{/*this.state.value*/this.props.counter.value}</span>
                <button onClick={this.handleIncrement}>+</button>
                <button onClick={this.handleDecrement}>-</button>
                <button onClick={this.handleDelete}>delete</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}

export default Counter;