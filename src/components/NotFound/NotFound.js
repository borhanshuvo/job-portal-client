import React from 'react';

const NotFound = () => {
    const errorClass = { margin: '100px auto', textAlign: 'center' }
    return (
        <div style={errorClass}>
            <h1>Sorry</h1>
            <h1>4O4 Not Found!!!</h1>
        </div>
    );
};

export default NotFound;