import React, { Component } from 'react';
import './blog.css';

class BlogInfo extends Component {
    handleBlogSelected = () => {
        this.props.onBlogSelected(this.props.blog);
    }

    render() {
        const { name, website, company } = this.props.blog;
        return (
            <div className="blog" onClick={this.handleBlogSelected}>
                <h2>{name}</h2>
                <h4>{website}</h4>
                <h4>{company}</h4>
            </div>
        );
    }
}

export default BlogInfo;