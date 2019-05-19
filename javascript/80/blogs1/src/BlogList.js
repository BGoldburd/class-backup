import React, { Component } from 'react';
import BlogInfo from './BlogInfo';
import Blog from './Blog';

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

    handleBlogSelected = blog => {
        this.setState({
            selectedBlog: blog
        });
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
                {this.state.blogs.map(blog => <BlogInfo key={blog.id} blog={blog} onBlogSelected={this.handleBlogSelected} />)}
                <hr />
                {this.state.selectedBlog && <Blog blog={this.state.selectedBlog} />}
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
                <h1>PCS Blogs</h1>
                <hr />
                {content}
            </>
        );
    }
}

export default BlogList;