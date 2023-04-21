import React from 'react';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className="gh-logo">
            <a href="https://github.com/manojnaidu619/react-movie-seat-booking" target="_blank">
                <img src={logo} alt="WatchaFlick" style={{ width: '80px', height: '80px' }}/>
            </a>
        </div>
    )
}

export default Logo