import React, { Component } from 'react';
import './AddComment.css';

export default class AddComment extends Component {
    state = {};

    render() {
        return (
            <form id="addComment" onSubmit={this.submit}>
                <textarea ref="content"></textarea>
                <button>add comment</button>
                <button type="button" onClick={this.cancel}>cancel</button>
            </form>
        );
    }

    submit = (e) => {
        e.preventDefault();

        fetch('http://localhost/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: this.refs.content.value })
        })

        this.props.onComplete();
    }

    cancel = () => {
        this.props.onComplete();
    }
}
