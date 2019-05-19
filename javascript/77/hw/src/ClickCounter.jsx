import React, { Component } from 'react';

export default class Click extends Component {
    /*constructor(props) {
        super(props);

        this.state = {
            clicks: 0
        }

        // this.handleClick = this.handleClick.bind(this);
    }*/

    state = {
        clicks: 0
    }

    //handleClick() {
    handleClick = () => {
        console.log("Click!", this);
        this.setState({
            clicks: this.state.clicks + 1
        });
    }

    render() {
        return (
            //<button onClick={() => this.handleClick()}>I have been clicked {this.state.clicks} times</button>
            <button onClick={this.handleClick}>I have been clicked {this.state.clicks} times</button>
        );
    }
}