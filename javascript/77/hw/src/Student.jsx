import React, { Component } from 'react';
import Address from './Address';
import Grades from './Grades';

export default props => (
    <div>
        <h3>{props.student.name}</h3>
        <Address address={props.student.address} />
        <Grades grades={props.student.grades} />
    </div>
);

export function StudentFunction(props) {
    return (
        <div>
            <h3>{props.student.name}</h3>
            <h4>{props.student.address.street}</h4>
            <h4>{props.student.address.city}</h4>
            <h4>{props.student.address.state}</h4>
            <h4>{props.student.address.zip}</h4>
        </div>
    );
}

export class StudentClass extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <h4>{this.props.address}</h4>
            </div>
        );
    }
}
