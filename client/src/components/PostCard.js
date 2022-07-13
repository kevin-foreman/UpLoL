import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { REMOVE_POST } from '../utils/mutations';
import sha256 from 'crypto-js/sha256';

function PostCard({ post, index, showDeleteButton }) {
  const { username: userParam } = useParams();
  const [removePost] = useMutation(REMOVE_POST);
  // set up to only show the name & username if the person is NOT on a profile page
  var showName = true;
  if (window.location.pathname === '/profile') {
    showName = false;
  }
  console.log(post);
  // when a user confirms an image deletion, remove it form Cloudinary then after a success, remove it from the db and refresh the webpage
  async function deletePost(e) {
    // obtain the current Unix time in seconds
    const currentDate = (Date.now() / 1000).toFixed();
    // using the picture id & the current date, create an sha256 hash to be used for the delete request
    const parameters = `public_id=${e.target.dataset.id}&timestamp=${currentDate}`;
    const string = parameters.concat(process.env.REACT_APP_API_SECRET);
    const signature = sha256(string).toString();

    // create a new FormData & add the required information
    const formData = new FormData();
    formData.append('api_key', process.env.REACT_APP_API_KEY);
    formData.append('public_id', e.target.dataset.id);
    formData.append('timestamp', currentDate);
    formData.append('signature', signature);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      await removePost({
        variables: { postId: e.target.dataset.id },
      });
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_PROFILE_ID}/image/destroy`,
          formData
        )
        .then((response) => {
          console.log(response);
        });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='col-md-4 col-sm-6 col-12 my-2'>
      <div className='card'>
        <div
          className='bg-image border-bottom ripple'
          data-mdb-ripple-color='light'
        >
          <h5 className='card-header text-center'>{post.title}</h5>
          <img
            className='card-img-top'
            alt={post.title}
            src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/${post.imageId}.jpg`}
          />
          {/* use to link to singlePost page */}
          <Link to={`/post/${post._id}`}>
            <div className='mask'></div>
          </Link>
        </div>

        <div className='card-body'>
          {showName && (
            <h6 className='card-subtitle mb-3 text-muted  text-center'>
              By: {post.name}{' '}
              <Link to={`/profile/${post.username}`}>@{post.username}</Link>
            </h6>
          )}

          <h6 className='card-subtitle mb-3 text-muted  text-center'>
            {post.createdAt}
          </h6>

          <div className='small d-flex justify-content-center'>
            <div href='#!' className='d-flex align-items-center me-3'>
              <i className='far fa-thumbs-up me-2'></i>
              <p className='mb-0'>{post.likeCount}</p>
            </div>
            <div className='d-flex align-items-center me-3'>
              <i className='far fa-comment-dots me-2'></i>
              <p className='mb-0'>{post.replyCount}</p>
            </div>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.origin}/post/${post._id}&text=Check+Out+"${post.title}"+At:&via=${window.location.origin}/profile/${post.username}`}
              target='_blank'
              rel='noreferrer'
              className='d-flex align-items-center me-3'
            >
              <i className='fab fa-twitter me-2'></i>
            </a>
          </div>
          {/* render the delete button and delete modal if it is the user's profile */}
          {!userParam && showDeleteButton && (
            <>
              <div className='text-center'>
                <button
                  className='btn project-card-btn mt-2'
                  data-mdb-toggle='modal'
                  // each modal needs to be named differently using letters, so we convert the index number passed from the profile to the associated character
                  data-mdb-target={`#${String.fromCharCode(index + 65)}Modal`}
                >
                  Delete
                </button>
              </div>
              {/* Delete Post modal pops up when a picture is clicked */}
              <div
                className='modal fade'
                id={`${String.fromCharCode(index + 65)}Modal`}
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
                        data-id={post.imageId}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
