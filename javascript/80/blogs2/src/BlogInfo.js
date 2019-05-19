import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

class BlogInfo extends Component {
    render() {
        const { name, website, company } = this.props.blog;
        return (
            <Link className="blog" to={`/blog/${this.props.blog.id}`}>
                <h2>{name}</h2>
                <h4>{website}</h4>
                <h4>{company}</h4>
            </Link>
        );
    }
}

export default BlogInfo;