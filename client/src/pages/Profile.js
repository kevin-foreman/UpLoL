import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_POST } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
  // get the username from the parameter
  const { username: userParam } = useParams();
  // if (userParam) {
  //   console.log('Username: ', userParam);
  // }

  // set up settings form state
  const [formState, setFormState] = useState({
    profilePicture: '',
    name: '',
  });

  // set up query to delete selected photo
  const [removePost] = useMutation(REMOVE_POST);

  // query the user data
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};

  // set the state for the title & file
  function handleForm(e) {
    if (e.target.name === 'file') {
      setFormState({ file: e.target.files[0] });
    } else if (e.target.name === 'name') {
      setFormState({ title: e.target.value });
    }
    console.log(formState);
  }

  // when a user confirms an image deletion, remove it form the db and refresh the webpage
  async function deletePost(e) {
    console.log('deleting: ', e.target.id);
    try {
      await removePost({
        variables: { postId: e.target.id },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) return <h1>Loading</h1>;

  return (
    <section className='h-100 gradient-custom-2'>
      <h1>Profile</h1>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col col-lg-9 col-xl-7'>
            <div className='card'>
              <div
                className='rounded-top text-white d-flex flex-row'
                style={{ backgroundColor: '#000', height: '200px' }}
              >
                <div
                  className='ms-4 mt-5 d-flex flex-column'
                  style={{ width: '150px' }}
                >
                  {/* Replace this hard-coded image with image the user provided */}
                  {user.profilePicture ? (
                    <img
                      src={`https://res.cloudinary.com/dzmr76die/image/upload/v1657305824/${user.profilePicture}.png`}
                      alt='User custom'
                      className='img-fluid img-thumbnail mt-4 mb-2'
                      style={{ width: '150px', zIndex: 1 }}
                    />
                  ) : (
                    <img
                      src='https://res.cloudinary.com/dzmr76die/image/upload/v1657305824/default-pfp_qbsiui.png'
                      alt='User custom'
                      className='img-fluid img-thumbnail mt-4 mb-2'
                      style={{ width: '150px', zIndex: 1 }}
                    />
                  )}

                  {/* Use this button to link to our ProfileSettings page */}
                  <button
                    type='button'
                    className='btn btn-outline-dark'
                    data-mdb-ripple-color='dark'
                    data-mdb-toggle='modal'
                    data-mdb-target='#settingsModal'
                    style={{ zIndex: 1 }}
                  >
                    Edit profile
                  </button>
                  {/* modal for user settings */}
                </div>
                <div className='ms-3' style={{ marginTop: '130px' }}>
                  {/* Replace this hard-coded value with dynamic content provided from user */}
                  <h5>{user.name}</h5>
                  <h5>@{user.username}</h5>
                </div>
              </div>
              <div
                className='p-4 text-black'
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className='d-flex justify-content-end text-center py-1'>
                  <div>
                    <p className='mb-1 h5'>{user.posts.length}</p>
                    <p className='small text-muted mb-0'>Photos</p>
                  </div>
                  <div className='px-3'>
                    <p className='mb-1 h5'>{user.followerCount}</p>
                    <p className='small text-muted mb-0'>Followers</p>
                  </div>
                  <div>
                    <p className='mb-1 h5'>{user.followCount}</p>
                    <p className='small text-muted mb-0'>Following</p>
                  </div>
                </div>
              </div>
              <div className='card-body p-4 text-black'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <p className='lead fw-normal mb-0'>{user.username}'s Posts</p>
                  <p className='mb-0'>
                    <a href='#!' className='text-muted'>
                      Show all
                    </a>
                  </p>
                </div>

                {/* Each of these images will be dynamic based on what the user has recently posted */}
                <div className='row g-2'>
                  {user.posts.map((post) => (
                    <div className='col-6 mb-2' key={post._id}>
                      {/* if this is the current user's profile, allow them to delete a post by clicking on it */}
                      <img
                        src={`https://res.cloudinary.com/dzmr76die/image/upload/v1657169752/${post.imageId}.jpg`}
                        alt='User custom 1'
                        className='w-100 rounded-3'
                        href='#!'
                        data-mdb-toggle='modal'
                        data-mdb-target='#deleteModal'
                      ></img>
                      {/* modal pops up when a picture is clicked */}
                      <div
                        className='modal fade'
                        id='deleteModal'
                        tabIndex='-1'
                        aria-labelledby='deleteModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <button
                                type='button'
                                className='btn-close'
                                data-mdb-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body'>
                              Are you sure you want to delete this post?
                            </div>
                            <div className='modal-footer'>
                              <button
                                type='button'
                                className='btn btn-dark'
                                // onClick={deletePost(post.imageId)}
                                id={post._id}
                                onClick={deletePost}
                              >
                                Yes
                              </button>
                              <button
                                type='button'
                                className='btn btn-dark'
                                data-mdb-dismiss='modal'
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* settings modal */}
      <div
        className='modal fade'
        id='settingsModal'
        tabIndex='-1'
        aria-labelledby='settingsModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='settingsModalLabel'>
                User Settings
              </h5>
              <button
                type='button'
                className='btn-close'
                data-mdb-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form>
                {/* name change input */}
                <div className='form-outline mb-4'>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='form-control'
                    placeholder={user.name}
                    onChange={handleForm}
                  />
                  <label className='form-label' htmlFor='name'>
                    Change your display name
                  </label>
                </div>
                {/* profile picture input */}
                <label className='form-label' htmlFor='file'>
                  Change your profile picture
                </label>
                <br />
                <input
                  type='file'
                  name='file'
                  accept='.jpg'
                  onChange={handleForm}
                  className='form-control'
                  id='file'
                />

                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-mdb-dismiss='modal'
                  >
                    Close
                  </button>
                  <button type='button' className='btn btn-primary'>
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
