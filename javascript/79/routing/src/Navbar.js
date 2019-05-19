import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/about" exact>About</NavLink>
        </li>
        <li>
            <NavLink to="/contacts" exact>Contacts</NavLink>
        </li>
    </ul>
);

export default Navbar;