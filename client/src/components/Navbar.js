import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Login from './Login';
import Signup from './Signup';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  console.log(window.location.pathname);

  return (
    <nav className='navbar navbar-expand-lg sticky-top navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          <img
            src='https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp'
            class='me-2'
            height='20'
            alt='MDB Logo'
            loading='lazy'
          />
          UpLoL
        </Link>
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
            <li className='nav-item'></li>
            {Auth.loggedIn() && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/profile'>
                    My Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/following'>
                    Following
                  </Link>
                </li>
              </>
            )}
            <li className='nav-item'>
              <a
                className='nav-link'
                target='_blank'
                rel='noreferrer'
                href='https://github.com/kevin-foreman/UpLoL'
              >
                About
              </a>
            </li>
          </ul>
          {Auth.loggedIn() ? (
            <a className='nav-link pe-2' href='/' onClick={logout}>
              Logout
            </a>
          ) : (
            <>
              <a
                href='!#'
                className='nav-link pe-2'
                data-mdb-target='#LoginModal'
                data-mdb-toggle='modal'
                data-mdb-dismiss='modal'
              >
                Login
              </a>
              <a
                href='!#'
                className='nav-link pe-2'
                data-mdb-target='#SignupModal'
                data-mdb-toggle='modal'
                data-mdb-dismiss='modal'
              >
                Signup
              </a>
              {/* Signup modal dialog */}
              <div
                className='modal fade'
                id='SignupModal'
                aria-hidden='true'
                aria-labelledby='SignupModal'
                tabindex='-1'
              >
                <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='SignupModal'>
                        Signup
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-mdb-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      <Signup />
                    </div>
                    <div className='d-flex justify-content-center mb-4'>
                      <div class='modal-dialog-centered'>
                        <h6 className='mx-2'>Already have an account?</h6>

                        <button
                          className='btn btn-primary'
                          data-mdb-target='#LoginModal'
                          data-mdb-toggle='modal'
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Login modal dialog  */}
              <div
                className='modal fade'
                id='LoginModal'
                aria-hidden='true'
                aria-labelledby='exampleModalToggleLabel1'
                tabindex='-1'
              >
                <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='exampleModalToggleLabel1'>
                        Login
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-mdb-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      <Login />
                    </div>
                    <div className='d-flex justify-content-center mb-4'>
                      <div class='modal-dialog-centered'>
                        <h6 className='mx-2'>Don't have an account?</h6>

                        <button
                          className='btn btn-primary'
                          data-mdb-target='#SignupModal'
                          data-mdb-toggle='modal'
                        >
                          Signup
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
