import React from 'react';

function Navigation(props) {
    // const { currentTab, setCurrentTab } = props;

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
                            {/* {currentTab === 'about' ? (
                <a
                  href='#about'
                  className='nav-link disabled'
                  onClick={() => setCurrentTab('about')}
                >
                  About Me
                </a>
              ) : (
                <a
                  href='#about'
                  className='nav-link'
                  onClick={() => setCurrentTab('about')}
                >
                  About Me
                </a>
              )} */}
                        </li>
                        <li className='nav-item'>
                            {/* {currentTab === 'projects' ? (
                <a
                  href='#project'
                  className='nav-link disabled'
                  onClick={() => setCurrentTab('projects')}
                >
                  Portfolio
                </a>
              ) : (
                <a
                  href='#project'
                  className='nav-link'
                  onClick={() => setCurrentTab('projects')}
                >
                  Portfolio
                </a>
              )} */}
                        </li>
                        <li className='nav-item'>
                            {/* {currentTab === 'contact' ? (
                <a
                  href='#contact'
                  className='nav-link disabled'
                  onClick={() => setCurrentTab('contact')}
                >
                  Contact
                </a>
              ) : (
                <a
                  href='#contact'
                  className='nav-link'
                  onClick={() => setCurrentTab('contact')}
                >
                  Contact
                </a>
              )} */}
                        </li>
                        <li className='nav-item'>
                            {/* {currentTab === 'resume' ? (
                <a
                  href='#resume'
                  className='nav-link disabled'
                  onClick={() => setCurrentTab('resume')}
                >
                  Resume
                </a>
              ) : (
                <a
                  href='#resume'
                  className='nav-link'
                  onClick={() => setCurrentTab('resume')}
                >
                  Resume
                </a>
              )} */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
