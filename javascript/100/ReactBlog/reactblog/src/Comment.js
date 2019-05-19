import React from 'react';
import './Comment.css';

export default ({ comment }) => {
    return (
        <>
            <h3>{comment.content}</h3>
            <h4>by {comment.author} on {comment.date}</h4>
        </>
    );
}
