import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu"
                    aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" className="navbar-collapse collapse">
                <div className="navbar-nav ml-auto">
                    <Link to='/' className="nav-item nav-link active">Home</Link>
                    <Link to='/about' className="nav-item nav-link">About</Link>
                    <Link to='/services' className="nav-item nav-link">Services</Link>
                    <Link to='/contact' className="nav-item nav-link">Contact</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;