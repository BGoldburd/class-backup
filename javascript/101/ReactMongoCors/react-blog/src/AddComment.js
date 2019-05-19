import React, { Component } from 'react';
import './AddComment.css';

export default class AddComment extends Component {
    render() {
        return (
            <div className="addComment">
                <textarea id="content" ref="content"></textarea>
                <button onClick={this.addComment}>add comment</button>
                <button onClick={this.cancel}>cancel</button>
            </div>
        );
    }

    addComment = () => {
        fetch(`http://127.0.0.1/posts/${this.props.postId}/comments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ content: this.refs.content.value })
        })
            .then(() => this.props.onComplete())
            .catch(err => console.error(err));
    }

    cancel = () => {
        this.props.onComplete();
    }
}