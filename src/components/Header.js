import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../services/firebase';
import "../css/Header.css"

function Header() {

    return (
        <header>
            <nav  className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand" to="/">Healthy Way</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    {auth.currentUser
                        ? <div className="navbar-nav" >
                            <p style={{
                                position: "relative",
                                marginTop: "1.5%",
                                left:"-5%",
                                fontWeight:"350",
                                fontSize:"large"
                            }}>You are logged with {auth.currentUser.email} </p>
                            <Link id="navLink" className="nav-item nav-link" to="/calculator">Calculator</Link>
                            <Link id="navLink" className="nav-item nav-link" to="/profile">Profile</Link>
                            <button
                                style={{
                                    backgroundColor: "#2e3239"
                                }}
                                className="btn btn-primary" onClick={() => auth.signOut()}>Logout</button>
                        </div>
                        : <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/login">Sign In</Link>
                            <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
                        </div>}
                </div>
            </nav>
        </header>
    );
}

export default Header;