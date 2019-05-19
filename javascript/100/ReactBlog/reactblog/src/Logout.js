import React from 'react';

export default ({ user, onLogout }) => {
    return (
        <>
            Logged in as {user} <button onClick={onLogout}>logout</button>
        </>
    );
}
