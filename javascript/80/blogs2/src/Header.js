import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <h1>PCS Blogs</h1>
            <NavLink exact to="/blogs">blogs</NavLink> | <NavLink exact to="/test">test</NavLink>
            <hr />
        </>
    );
}

export default Header;