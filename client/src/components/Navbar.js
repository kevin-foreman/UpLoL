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

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='navbar-brand'>{/* header logo goes here */}UpLoL</div>
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
                  <Link to='/profile'>My Profile</Link>
                  <br />
                  <a href='/' onClick={logout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <button
                    className='btn btn-primary'
                    data-mdb-target='#LoginModal'
                    data-mdb-toggle='modal'
                    data-mdb-dismiss='modal'
                  >
                    Login
                  </button>
                  <button
                    className='btn btn-primary'
                    data-mdb-target='#SignupModal'
                    data-mdb-toggle='modal'
                    data-mdb-dismiss='modal'
                  >
                    Signup
                  </button>
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
                          <h5
                            className='modal-title'
                            id='exampleModalToggleLabel1'
                          >
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
