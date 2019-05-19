import React from 'react';

const Post = ({ title, body }) => {
    return (
        <>
            <h4>{title}</h4>
            <p>{body}</p>
        </>
    );
};

export default Post;