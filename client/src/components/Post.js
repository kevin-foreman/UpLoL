import React from 'react';

function Post() {
  return (
    <section>
      <div id='preview' className='preview'>
        <div style={{ display: 'none' }}></div>
        <div>
          <div
            data-draggable='true'
            className=''
            style={{ position: 'relative' }}
          >
            <section
              draggable='false'
              className='container pt-5'
              data-v-271253ee=''
            >
              <section className='mb-10'>
                <img
                  src='https://mdbootstrap.com/img/new/slides/198.jpg'
                  className='img-fluid shadow-1-strong rounded-5 mb-4'
                  alt=''
                  aria-controls='#picker-editor'
                />
                <div className='row align-items-center mb-4'>
                  <div className='col-lg-7'>
                    <img
                      src='https://mdbootstrap.com/img/Photos/Avatars/img%20(23).jpg'
                      className='rounded-circle me-2'
                      height='35'
                      alt=''
                      loading='lazy'
                      aria-controls='#picker-editor'
                    />{' '}
                    <span>
                      {' '}
                      Published <u>15.07.2020</u> by
                    </span>{' '}
                    <a
                      href='undefined'
                      className='text-dark'
                      aria-controls='#picker-editor'
                    >
                      Anna Maria Doe
                    </a>
                  </div>
                </div>
                <h1 className='fw-bold mb-4'>Caption</h1>
              </section>
            </section>
          </div>
          <div
            data-draggable='true'
            className=''
            style='position: relative;'
            draggable='false'
          >
            <section
              draggable='false'
              className='container pt-5'
              data-v-271253ee=''
            >
              <section className='mb-10'>
                <h5 className='fw-bold text-center mb-5'>
                  <strong>Leave a comment</strong>
                </h5>
                <form>
                  {/*Comment input */}
                  <div className='form-outline mb-4'>
                    <textarea
                      className='form-control'
                      id='form4Example3'
                      rows='4'
                    ></textarea>
                    <label
                      className='form-label'
                      for='form4Example3'
                      style='margin-left: 0px'
                    >
                      Write a public comment...
                    </label>
                    <div className='form-notch'>
                      <div
                        className='form-notch-leading'
                        style='width: 9px;'
                      ></div>
                      <div
                        className='form-notch-middle'
                        style='width: 32px;'
                      ></div>
                      <div className='form-notch-trailing'></div>
                    </div>
                  </div>
                  {/*!-- Submit button -->*/}
                  <button
                    type='submit'
                    className='btn   btn-info btn-rounded w-100 mb-4'
                    aria-controls='#picker-editor'
                    style='min-width: auto;'
                  >
                    Post
                  </button>
                </form>
              </section>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;
