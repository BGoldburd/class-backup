import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
    return (
        <header>
            <h1>React Mongo Socket IO Blog</h1>
            <h2>Welcome to the blog!</h2>
            <NavLink to="/">Home</NavLink> | <NavLink to="/addPost">Add Post</NavLink>
        </header>
    );
}
