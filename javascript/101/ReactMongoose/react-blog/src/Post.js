import React, { Component } from 'react';
import Comment from './Comment';
import AddComment from './AddComment';

export default class Post extends Component {
    state = {};

    render() {
        const { _id, title, author, date, content, comments } = this.props.post;
        const addComment = this.state.addingComment ? null : <button className="addComment" onClick={this.addComment}>add comment</button>;
        const addingComment = this.state.addingComment ? <AddComment postId={_id} onComplete={this.doneCommenting} /> : null;
        const commentElems = comments ? comments.map((c, index) => (<Comment key={index} comment={c} />)) : null;
        return (
            <div className="post" id={_id}>
                <h2>{title}</h2>
                <h3>by {author} on {date}</h3>
                <div>{content}</div>
                <div className="comments">
                    {addComment}
                    {addingComment}
                    {commentElems}
                </div>
            </div>
        );
    }

    addComment = () => {
        this.setState({
            addingComment: !this.state.addingComment
        });
    }

    doneCommenting = () => {
        this.setState({
            addingComment: false
        });
    }
}