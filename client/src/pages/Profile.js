import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USER, IS_FOLLOWING } from '../utils/queries';
import { UPDATE_USER, FOLLOW_USER, UNFOLLOW_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import UploadForm from '../components/UploadForm';
import PostCard from '../components/PostCard';
import UserList from '../components/UserList';

const Profile = () => {
  // get the username from the parameter
  const { username: userParam } = useParams();

  // set up settings form state
  const [formState, setFormState] = useState({
    profilePicture: '',
    name: '',
  });
  // set up follow/unfollow button state
  const [followButton, setFollowButton] = useState({
    follow: false,
  });
  // set the state for the followers list
  const [followerState, setFollowerState] = useState([]);

  // set up query to delete selected photo
  const [updateUser] = useMutation(UPDATE_USER);
  // set up the mutation to follow a user
  const [followUser] = useMutation(FOLLOW_USER);
  // set up the mutation to unfollow a user
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  // query the user data
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    // using the username, query the user info
    variables: { username: userParam },
  });
  // query if the logged in user is following the profile page user
  const [getIsFollowing] = useLazyQuery(IS_FOLLOWING);

  const user = data?.me || data?.user || null;
  if (user) console.log(user);

  // check if the user is being followed & set the state accordingly
  useEffect(() => {
    if (user) {
      async function get() {
        const isFollowing = await getIsFollowing({
          variables: { id: user._id },
        });
        setFollowButton({ follow: isFollowing.data.isFollowing });
      }
      get();
      setFollowerState(user.followers);
    }
  }, [user]);

  // if the user is on their own profile, change the url to show that, else, leave the username in the url
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) return <h1 className='text-center'>Loading</h1>;
  // if the user stumbles upon a user that doesn't exist, redirect them home
  if (!loading && !user) {
    return <Navigate to='/' />;
  }

  // set the state for the title & file
  function handleForm(e) {
    if (e.target.name === 'file') {
      setFormState({ ...formState, profilePicture: e.target.files[0] });
    } else if (e.target.name === 'name') {
      setFormState({ ...formState, name: e.target.value });
    }
  }

  // submit the settings form
  function handleSubmit(e) {
    e.preventDefault();
    const { profilePicture, name } = formState;
    // if a user is not logged in, do not process the form submission
    if (!Auth.loggedIn()) {
      return;
    }
    // create a new FormData & add the file & upload preset
    if (profilePicture && name) {
      try {
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

        // use an axios post request to submit the form to our api
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_PROFILE_ID}/image/upload`,
            formData
          )
          .then((response) => {
            // use the image id in the response to submit to the database
            updateUser({
              variables: {
                profilePictureId: response.data.public_id,
                name: name,
              },
            }).then((graphqlResponse) => {
              window.location.reload();
            });
          });
      } catch (e) {
        console.log(e);
      }
    } else if (name) {
      try {
        updateUser({
          variables: {
            name: name,
          },
        }).then((graphqlResponse) => {
          window.location.reload();
        });
      } catch (e) {
        console.log(e);
      }
    } else if (profilePicture) {
      try {
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
        // use an axios post request to submit the form to our api
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_PROFILE_ID}/image/upload`,
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
                  {/* Replace this hard-coded image with the image the user uploaded */}
                  {user.profilePictureId ? (
                    <img
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657305824/${user.profilePictureId}.jpg`}
                      alt='User custom'
                      className='img-fluid img-thumbnail mt-4 mb-2'
                      style={{ width: '150px', zIndex: 1 }}
                    />
                  ) : (
                    <img
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657305824/default-pfp_qbsiui.png`}
                      alt='User custom'
                      className='img-fluid img-thumbnail mt-4 mb-2'
                      style={{ width: '150px', zIndex: 1 }}
                    />
                  )}

                  {/* load the follow button if the user is logged in and the userParam is true */}
                  {userParam && Auth.loggedIn() && !followButton.follow && (
                    <>
                      <button
                        type='button'
                        class='btn btn-primary'
                        style={{ zIndex: 1 }}
                        onClick={() => {
                          followUser({
                            variables: { userId: user._id },
                          }).then(({ data }) => {
                            // add the suer to the followers list
                            setFollowerState([
                              ...followerState,
                              {
                                name: data.followUser.name,
                                username: data.followUser.username,
                                followerCount: data.followUser.followCount,
                              },
                            ]);
                          });
                          setFollowButton({ follow: true });
                        }}
                      >
                        Follow
                      </button>
                    </>
                  )}
                  {/* load the unfollow button if the user is being followed already */}
                  {userParam && Auth.loggedIn() && followButton.follow && (
                    <>
                      <button
                        type='button'
                        class='btn btn-primary'
                        style={{ zIndex: 1 }}
                        onClick={() => {
                          unfollowUser({
                            variables: { userId: user._id },
                          }).then(({ data }) => {
                            // find the user in the state array and remove them
                            setFollowerState([
                              (state) => {
                                state.filter((user) => {
                                  return (
                                    user.username !== data.unfollowUser.username
                                  );
                                });
                              },
                            ]);
                          });
                          setFollowButton({ follow: false });
                        }}
                      >
                        Unfollow
                      </button>
                    </>
                  )}
                  {/* load the edit profile modal if the userParam is false */}
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
                  <div className='px-3 border border-dark rounded-3'>
                    <p className='mb-1 h5'>{user.posts.length}</p>
                    <p className='small text-muted mb-0'>Photos</p>
                  </div>

                  {followerState.length ? (
                    <div
                      className='px-3 border border-dark rounded-3'
                      data-mdb-toggle='modal'
                      data-mdb-target='#FollowersModal'
                    >
                      <p className='mb-1 h5'>{followerState.length}</p>
                      <p className='small text-muted mb-0'>Followers</p>
                      <UserList users={followerState} listType='Followers' />
                    </div>
                  ) : (
                    <div className='px-3 border border-dark rounded-3'>
                      <p className='mb-1 h5'>{followerState.length}</p>
                      <p className='small text-muted mb-0'>Followers</p>
                    </div>
                  )}

                  {user.following.length ? (
                    <div
                      className='px-3 border border-dark rounded-3'
                      data-mdb-toggle='modal'
                      data-mdb-target='#FollowingModal'
                    >
                      <p className='mb-1 h5'>{user.followCount}</p>
                      <p className='small text-muted mb-0'>Following</p>
                      <UserList users={user.following} listType='Following' />
                    </div>
                  ) : (
                    <div className='px-3 border border-dark rounded-3'>
                      <p className='mb-1 h5'>{user.followCount}</p>
                      <p className='small text-muted mb-0'>Following</p>
                    </div>
                  )}
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
                {/* <div className='row g-2'>
                  {user.posts.map((post, index) => (
                    <div className='col-6 mb-2' key={post._id}>
                      <ProfilePostCard post={post} index={index} />
                    </div>
                  ))} */}
                <div className='row mt-2'>
                  {user.posts.map((post, index) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      index={index}
                      showDeleteButton={true}
                    />
                  ))}
                </div>
                {/* </div> */}
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
