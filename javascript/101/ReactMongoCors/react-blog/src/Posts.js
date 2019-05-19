import React, { Component } from 'react';
import Post from './Post';
import './Posts.css';
import openSocket from 'socket.io-client';

export default class Posts extends Component {
    state = { posts: [] };

    render() {
        return this.state.posts.map(p => <Post key={p._id} post={p} />);
    }

    componentDidMount() {
        const socket = openSocket('http://127.0.0.1');
        socket.on('comment', commentData => {
            const posts = [...this.state.posts]; // copy
            const index = this.state.posts.findIndex(p => p._id === commentData.post);
            const post = posts[index] = { ...posts[index] }; // copy
            post.comments = post.comments || [];
            post.comments.push(commentData.comment);

            this.setState({
                posts: posts
            });
        });

        fetch('http://127.0.0.1/posts', { credentials: 'include' })
            .then(posts => posts.json())
            .then(posts => this.setState({ posts }))
            .catch(err => console.error(err));
    }
}