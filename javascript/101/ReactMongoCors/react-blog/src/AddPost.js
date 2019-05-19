import React, { Component } from 'react';
import './AddPost.css';

export default class AddPost extends Component {
    state = { title: '', content: '' };

    render() {
        return (
            <form id="addPost" onSubmit={this.handleAddPost}>
                <label>Title
                    <input name="title" onChange={this.handleInputChange} value={this.state.title} />
                </label>
                <label>Content
                    <textarea name="content" onChange={this.handleInputChange} value={this.state.content}></textarea>
                </label>
                <button>submit</button>
            </form>
        );
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        /*const newState = {};
        newState[name] = value;*/

        this.setState({
            [name]: value
        });
    }

    handleAddPost = event => {
        event.preventDefault();

        fetch(`http://127.0.0.1/posts/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ title: this.state.title, content: this.state.content })
        })
            .then(() => this.props.history.push('/'))
            .catch(err => console.error(err));
    }
}