import React, { Component } from 'react';

export default class Comment extends Component {
    render() {
        const { content, author, date } = this.props.comment;
        return (
            <>
                <h3>{content}</h3>
                <h4>by {author} on {date}</h4>
            </>
        );
    }
}