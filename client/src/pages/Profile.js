import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { REMOVE_POST, UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import UploadForm from '../components/UploadForm';
import PostCard from '../components/PostCard';

const Profile = () => {
  // get the username from the parameter
  const { username: userParam } = useParams();
  // console.log('Username Parameter: ', userParam);

  // set up settings form state
  const [formState, setFormState] = useState({
    profilePicture: '',
    name: '',
  });

  // set up query to delete selected photo
  const [updateUser] = useMutation(UPDATE_USER);

  // query the user data
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    // using the username, query the user info
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user);

  // if the user is on their own profile, change the url to show that, else, leave the username in the url
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) return <h1>Loading</h1>;

  // set the state for the title & file
  function handleForm(e) {
    if (e.target.name === 'file') {
      setFormState({ ...formState, profilePicture: e.target.files[0] });
    } else if (e.target.name === 'name') {
      setFormState({ ...formState, name: e.target.value });
    }
    console.log(formState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { profilePicture, name } = formState;
    // if a user is not logged in, do not process the form submission
    if (!Auth.loggedIn()) {
      console.log('not logged in!');
      return;
    }
    // create a new FormData & add the file & upload preset
    if (profilePicture && name) {
      console.log('Changing name and pfp');
      try {
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', 'g61rj6le');

        // use an axios post request to submit the form to our api
        axios
          .post(
            `https://api.cloudinary.com/v1_1/dzmr76die/image/upload`,
            formData
          )
          .then((response) => {
            console.log(response);
            // use the image id in the response to submit to the database
            updateUser({
              variables: {
                profilePictureId: response.data.public_id,
                name: name,
              },
            }).then((graphqlResponse) => {
              console.log(graphqlResponse);
              window.location.reload();
            });
          });
      } catch (e) {
        console.log(e);
      }
    } else if (name) {
      console.log('Changing name');
      try {
        updateUser({
          variables: {
            name: name,
          },
        }).then((graphqlResponse) => {
          console.log(graphqlResponse);
          window.location.reload();
        });
      } catch (e) {
        console.log(e);
      }
    } else if (profilePicture) {
      console.log('Changing pfp');
      try {
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', 'g61rj6le');
        // use an axios post request to submit the form to our api
        axios
          .post(
            `https://api.cloudinary.com/v1_1/dzmr76die/image/upload`,
            formData
          )
          .then((response) => {
            console.log(response);
            // use the image id in the response to submit to the database
            updateUser({
              variables: {
                profilePictureId: response.data.public_id,
              },
            }).then((graphqlResponse) => {
              console.log(graphqlResponse);
              window.location.reload();
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <section className='h-100 gradient-custom-2'>
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
                  {user.profilePictureId ? (
                    <img
                      src={`https://res.cloudinary.com/dzmr76die/image/upload/v1657305824/${user.profilePictureId}.jpg`}
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

                  {!userParam && (
                    <>
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
                    </>
                  )}
                </div>
                <div className='ms-3' style={{ marginTop: '130px' }}>
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
                {/* component for a user to upload posts from their profile */}
                {!userParam && (
                  <>
                    <UploadForm />
                    <br />
                  </>
                )}

                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <p className='lead fw-normal mb-0'>{user.username}'s Posts</p>
                  <p className='mb-0'>
                    {/* <a href='#!' className='text-muted'>
                      Show all
                    </a> */}
                  </p>
                </div>

                {/* Each of these images will be dynamic based on what the user has recently posted */}
                <div className='row g-2'>
                  {user.posts.map((post, index) => (
                    <div className='col-6 mb-2' key={post._id}>
                      <PostCard post={post} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!userParam && (
        <>
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
                  <form onSubmit={handleSubmit}>
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
                      <button type='submit' className='btn btn-primary'>
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
