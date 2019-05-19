import React, { Component } from 'react';

export default class Clock extends Component {
    state = {
        time: new Date()
        //x: 0
    };

    /*constructor(props) {
        super(props);
        
        this.state = {
            time: new Date()
        };
    }*/

    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            time: new Date()
            //x: this.state.x + 1
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <h1>{this.state.time.toLocaleTimeString()}</h1>
            //<h1>{new Date().toLocaleTimeString()}</h1>
        );
    }
}