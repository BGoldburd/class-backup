import React, { Component } from 'react';

/*export default*/ class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        };

        setInterval(() => this.setState({
            counter: this.state.counter + 1
        }), 1000);
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.props.name}</h1>
                <h2>{this.state.counter}</h2>
            </div>
        );
    }
}

export default Welcome;