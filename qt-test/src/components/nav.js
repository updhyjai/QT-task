import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';

class Nav extends Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Countries of the World</Link>
                </div>
                <ul className="nav navbar-nav">
                    
                    <li>
                        {
                            (isLoggedIn()) ? <Link to="/countries">Country</Link>: ''
                        }

                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        {
                            (isLoggedIn()) ? (<button className="btn btn-danger log" onClick={() => logout()}>Log out </button>) : (<button className="btn btn-info log" onClick={() => login()}>Log In</button>)
                        }
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;