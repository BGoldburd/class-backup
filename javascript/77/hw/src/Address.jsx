import React, { Component } from 'react';
import './Address.css';

export default class Address extends Component {
    render() {
        const { street, city, state, zip } = this.props.address;

        return (
            <div>
                <h4>{street}</h4>
                <h4 className="city">{city}</h4>
                <h4>{state}</h4>
                <h4 style={{ color: 'red', textDecoration: 'underline' }}>{zip}</h4>
            </div>
        );
    }
}
