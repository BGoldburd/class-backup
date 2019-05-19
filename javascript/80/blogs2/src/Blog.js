import React, { Component } from 'react';
import Post from './Post';

class Blog extends Component {
    state = {
        loading: true
    };

    async fetchPosts() {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.match.params.blogId}`);
            if (!response.ok) {
                throw new Error('Unable to load posts!');
            }
            const posts = await response.json();
            this.setState({
                loading: false,
                posts
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: e
            });
            console.error(e);
        }
    }

    componentDidMount() {
        console.log('blog componentDidMount', this.props);
        this.fetchPosts();
    }

    componentDidUpdate(oldProps) {
        console.log('blog componentDidUpdate');
        if (this.props.match.params.blogId !== oldProps.match.params.blogId) {
            this.fetchPosts();
        }
    }

    renderLoading() {
        return <p>Loading, please wait....</p>
    }

    renderPosts() {
        return this.state.posts.map(post => <Post key={post.id} {...post} />);
    }

    renderError() {
        return <h1 style={{ color: 'red' }}>${this.state.error.message}` : 'Unable to load'}</h1>
    }

    render() {
        let content;
        if (this.state.loading) {
            content = this.renderLoading();
        } else if (this.state.posts) {
            content = this.renderPosts();
        } else { // error
            content = this.renderError();
        }

        return (
            <>
                {content}
            </>
        );
    }
}

export default Blog;