import React, { Component } from 'react';
import Post from './Post';
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
        fetch('http://localhost/posts')
            .then(data => data.json())
            .then(posts => this.setState({ posts }))
            .catch(err => console.error(err));
    }
}