import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
    return (
        <>
            <h1 className="text-center">PCS Recipe App</h1>
            <NavLink to="/recipes">recipes</NavLink> | <NavLink to="/addRecipe">add recipe</NavLink>
            <hr />
        </>
    );
}

export default Header;