import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const NavBar = ({user}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Vidly</Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink className="nav-item nav-link" to="/">Movies</NavLink>
                <NavLink className="nav-item nav-link" to="/cutomers">Customers</NavLink>
                <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                {!user && 
                    <>
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                    </>
                }
                {user && 
                    <>
                        <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
                        <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                    </>
                }
            </div>
        </div>
        </nav>
    );
}
 
export default NavBar;