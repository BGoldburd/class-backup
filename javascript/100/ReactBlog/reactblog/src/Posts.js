import React, { Component } from 'react';
import Post from './Post';
import openSocket from 'socket.io-client';
import './Posts.css';

export default class Posts extends Component {
    state = { posts: [] };

    render() {
        const posts = this.state.posts.map(p => <Post post={p} />)
        return (
            <>
                {posts}
            </>
        );
    }

    componentDidMount() {
        fetch('http://127.0.0.1/posts', { credentials: 'include' })
            .then(data => data.json())
            .then(posts => this.setState({ posts }))
            .catch(err => console.error(err));

        this.socket = openSocket('http://localhost/');
        this.socket.on('comment', commentData => {
            const posts = [...this.state.posts]; // copy
            const index = posts.findIndex(p => p._id === commentData.post);
            const post = posts[index] = { ...posts[index] }; // copy
            post.comments = post.comments || [];
            post.comments.push(commentData.comment);
            this.setState({
                posts
            });
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }
}