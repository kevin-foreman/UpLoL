import React from 'react';

const Profile = () => {
  return (
    <section className='h-100 gradient-custom-2'>
      <h1>Profile</h1>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col col-lg-9 col-xl-7'>
            <div className='card'>
              <div
                className='rounded-top text-white d-flex flex-row'
                // style={{ backgroundColor: '#000', height: '200px' }}
              >
                <div
                  className='ms-4 mt-5 d-flex flex-column'
                  // style={{ width: '150px' }}
                >
                  {/* Replace this hard-coded image with image the user provided */}
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                    alt='User custom'
                    className='img-fluid img-thumbnail mt-4 mb-2'
                    // style={{ width: '150px', zIndex: 1 }}
                  />

                  {/* Use this buttom to link to our ProfileSettings page */}
                  <button
                    type='button'
                    className='btn btn-outline-dark'
                    data-mdb-ripple-color='dark'
                    // style={{ zIndex: 1 }}
                  >
                    Edit profile
                  </button>
                </div>
                <div className='ms-3' style={{ marginTop: '130px' }}>
                  {/* Replace this hard-coded value with dynamic content provided from user */}
                  <h5>Andy Horwitz</h5>
                </div>
              </div>
              <div
                className='p-4 text-black'
                // style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className='d-flex justify-content-end text-center py-1'>
                  <div>
                    <p className='mb-1 h5'>253</p>
                    <p className='small text-muted mb-0'>Photos</p>
                  </div>
                  <div class='px-3'>
                    <p className='mb-1 h5'>1026</p>
                    <p className='small text-muted mb-0'>Followers</p>
                  </div>
                  <div>
                    <p className='mb-1 h5'>478</p>
                    <p className='small text-muted mb-0'>Following</p>
                  </div>
                </div>
              </div>
              <div className='card-body p-4 text-black'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <p className='lead fw-normal mb-0'>Recent pictures</p>
                  <p className='mb-0'>
                    <a href='#!' className='text-muted'>
                      Show all
                    </a>
                  </p>
                </div>

                {/* Each of these images will be dynamic based on what the user has recently posted */}
                <div className='row g-2'>
                  <div className='col mb-2'>
                    {/* Replace with user's most recently posted image using createdAt */}
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp'
                      alt='User custom 1'
                      className='w-100 rounded-3'
                    ></img>
                  </div>
                  <div className='col mb-2'>
                    {/* Replace with user's second most recently posted image */}
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp'
                      alt='User custom 2'
                      className='w-100 rounded-3'
                    ></img>
                  </div>
                </div>
                <div className='row g-2'>
                  <div className='col'>
                    {/* Replace with user's third most recently posted image */}
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp'
                      alt='User custom 3'
                      className='w-100 rounded-3'
                    ></img>
                  </div>
                  <div className='col'>
                    {/* Replace with user's fourth most recently posted image */}
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp'
                      alt='User custom 3'
                      className='w-100 rounded-3'
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='ms-3'
          // style='margin-top: 130px;'
        >
          {/* Replace this hard-coded value with dynamic content provided from user */}
          <h5>Andy Horwitz</h5>
        </div>
      </div>
      <div
        className='p-4 text-black'
        //  style='background-color: #f8f9fa;'
      >
        <div className='d-flex justify-content-end text-center py-1'>
          <div>
            <p className='mb-1 h5'>253</p>
            <p className='small text-muted mb-0'>Photos</p>
          </div>
          <div class='px-3'>
            <p className='mb-1 h5'>1026</p>
            <p className='small text-muted mb-0'>Followers</p>
          </div>
          <div>
            <p className='mb-1 h5'>478</p>
            <p className='small text-muted mb-0'>Following</p>
          </div>
        </div>
      </div>
      <div className='card-body p-4 text-black'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <p className='lead fw-normal mb-0'>Recent pictures</p>
          <p className='mb-0'>
            <a href='#!' className='text-muted'>
              Show all
            </a>
          </p>
        </div>

        {/* Each of these images will be dynamic based on what the user has recently posted */}
        <div className='row g-2'>
          <div className='col mb-2'>
            {/* Replace with user's most recently posted image using createdAt */}
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp'
              alt='User custom image 1'
              className='w-100 rounded-3'
            ></img>
          </div>
          <div className='col mb-2'>
            {/* Replace with user's second most recently posted image */}
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp'
              alt='User custom image 2'
              className='w-100 rounded-3'
            ></img>
          </div>
        </div>
        <div className='row g-2'>
          <div className='col'>
            {/* Replace with user's third most recently posted image */}
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp'
              alt='User custom image 3'
              className='w-100 rounded-3'
            ></img>
          </div>
          <div className='col'>
            {/* Replace with user's fourth most recently posted image */}
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp'
              alt='User custom image 3'
              className='w-100 rounded-3'
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
