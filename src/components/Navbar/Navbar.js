import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


import './Navbar.css';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <header className="pb-5">
            <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <Link className="navbar-brand text-uppercase" to="/"><b>Job Portal</b></Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <div class="mx-auto"></div>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link className="nav-link text-uppercase fs-5" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link text-uppercase fs-5" to="/dashboard">Dashboard</Link>
                            </li>
                            {!loggedInUser.email &&
                                <li class="nav-item">
                                    <Link className="nav-link text-uppercase fs-5" to="/login">Login</Link>
                                </li>
                            }
                            {loggedInUser.email &&
                                <li class="nav-item">
                                    <button style={{ border: 'none' }} className="nav-link text-uppercase fs-5 bg-light" onClick={() => setLoggedInUser({})}>Logout</button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;