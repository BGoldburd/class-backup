import React, { Component } from 'react';
import './AddPost.css';

export default class AddPost extends Component {

    state = {
        title: '',
        content: ''
    }

    render() {
        return (
            <form class="addPost" onSubmit={this.handleAddPost}>
                <label>Title
                    <input name="title" value={this.state.title} onChange={this.handleInputChange} />
                </label>
                <label>Content
                    <textarea name="content" value={this.state.content} onChange={this.handleInputChange}></textarea>
                </label>
                <button>submit</button>
            </form>
        );
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleAddPost = e => {
        e.preventDefault();

        fetch(`http://127.0.0.1/posts`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: this.state.title, content: this.state.content })
        })
            .then(() => this.props.history.push('/'))
            .catch(err => console.error(err));

    }
}