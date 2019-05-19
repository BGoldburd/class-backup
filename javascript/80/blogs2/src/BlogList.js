import React, { Component } from 'react';
import BlogInfo from './BlogInfo';

class BlogList extends Component {
    state = {
        loading: true
    };

    async fetchBlogs() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Unable to load blogs!');
            }
            const blogs = await response.json();
            this.setState({
                loading: false,
                // filter to drop bad data from API!
                blogs: blogs.filter(blog => blog.name).map(blog => {
                    return {
                        id: blog.id,
                        name: blog.name,
                        website: blog.website,
                        company: blog.company.name
                    };
                })
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
        this.fetchBlogs();
    }

    renderLoading() {
        return <p>Loading, please wait....</p>
    }

    renderBlogs() {
        return (
            <>
                {this.state.blogs.map(blog => <BlogInfo key={blog.id} blog={blog} />)}
            </>
        );
    }

    renderError() {
        return <h1 style={{ color: 'red' }}>${this.state.error.message}` : 'Unable to load'}</h1>
    }

    render() {
        let content;
        if (this.state.loading) {
            content = this.renderLoading();
        } else if (this.state.blogs) {
            content = this.renderBlogs();
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

export default BlogList;