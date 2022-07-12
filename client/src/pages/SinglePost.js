import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST, QUERY_USER } from '../utils/queries';
import { LIKE_POST } from '../utils/mutations';
import { useParams } from 'react-router';
import Auth from '../utils/auth';

const SinglePost = () => {
  const { id: postId, username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_POST, QUERY_USER, {
    variables: { id: postId },
  });

  // Like button state
  const [likeButton, setLikeButton] = useState({
    like: false,
  });

  const [likeState, setLikeState] = useState([]);

  const [likePost] = useMutation(LIKE_POST);

  const post = data?.post || {};
  if (!loading) {
    console.log(post);
  }

  const user = data?.user || {};

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <div className='card mb-3'>
        <div className='row align-items-center mb-4'>
          <div className='col-lg-7'>
            <img
              src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/${user.profilePictureId}.jpg`}
              className='rounded-circle me-2'
              height='35'
              alt='user profile'
              loading='lazy'
              aria-controls='#picker-editor'
            />{' '}
            <span>
              {' '}
              Published <u>${post.createdAt}</u> by
            </span>{' '}
            <a
              href='undefined'
              className='text-dark'
              aria-controls='#picker-editor'
            >
              {/* ${user.username} */}
            </a>
          </div>
        </div>
        <div className='card-body'>
          <img
            src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/${post.imageId}.jpg`}
            className='img-fluid shadow-1-strong rounded-5 mb-4'
            alt='Post uploaded'
            aria-controls='#picker-editor'
          />
        </div>
        {/* Must not be available if a user is not logged in */}
        {userParam && Auth.loggedIn() && !likeButton.like && (
        <>
        <button
        type='button'
        className='btn btn-primary'
        style={{ zIndex: 1 }}
        onClick={() => {
          likePost({
            variables: { postId: post._id },
          }).then(({ data }) => {
            setLikeState([
              ...likeState,
              {
                name: data.likePost.name,
                username: data.likePost.username,
                likeCount: data.likePost.likeCount,
              },
            ]);
          });
          setLikeButton({ like: true })
        }}
        >
          Like
        </button>
        </>
        )}
        {/* Must not show up if a user is not logged in */}
        <div id='commentForm'>Comment Form</div>
        <div>Comments</div>
      </div>
    </main>
  );
};

export default SinglePost;
