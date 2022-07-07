import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='navbar-brand'>{/* header logo goes here */}</div>
        <button
          className='navbar-toggler'
          type='button'
          data-mdb-toggle='collapse'
          data-mdb-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className='fas fa-bars'></i>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              {Auth.loggedIn() ? (
                <>
                  <Link to='/profile'>Me</Link>
                  <a href='/' onClick={logout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <p>Login/Signup</p>
                </>
              )}
            </li>
            <li className='nav-item'>
              {Auth.loggedIn() && <Link to='/following'>Following</Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
