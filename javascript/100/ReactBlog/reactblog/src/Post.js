import React, { Component } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

export default class Post extends Component {
    state = {};

    render() {
        const { post } = this.props;
        const addCommentButton = this.state.addingComment ? null : <button onClick={this.addComment}>add comment</button>;
        const addComment = this.state.addingComment ? <AddComment postId={post._id} onComplete={this.commentingComplete} /> : null;
        const comments = !post.comments ? null : post.comments.map(c => <Comment comment={c} />);
        return (
            <div className="post" id={post._id}>
                <h2>{post.title}</h2>
                <h3>by {post.author} on {post.date}</h3>
                <div>{post.content}</div>
                <div className="comments">
                    {addCommentButton}
                    {addComment}
                    {comments}
                </div>
            </div>
        );
    }

    addComment = () => {
        this.setState({
            addingComment: true
        });
    }

    commentingComplete = () => {
        this.setState({
            addingComment: false
        });
    }
}
