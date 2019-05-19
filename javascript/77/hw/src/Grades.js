import React, { Component } from 'react';
import './grades.css';

export default class Grades extends Component {
    render() {
        return (
            <ul>{this.props.grades.map((grade, index) => <li key={index}>{grade}</li>)}</ul>
        );
    }
}