import React from 'react';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import UserList from './UserList';
import { REMOVE_POST } from '../utils/mutations';
import sha256 from 'crypto-js/sha256';

function PostCard(props) {
  const { post, index } = props;
  const { username: userParam } = useParams();
  const [removePost] = useMutation(REMOVE_POST);

  // when a user confirms an image deletion, remove it form Cloudinary then after a success, remove it from the db and refresh the webpage
  async function deletePost(e) {
    // obtain the current Unix time in seconds
    const currentDate = (Date.now() / 1000).toFixed();
    // using the picture id & the current date, create an sha256 hash to be used for the delete request
    const parameters = `public_id=${e.target.dataset.id}&timestamp=${currentDate}`;
    const string = parameters.concat(process.env.REACT_APP_API_SECRET);
    console.log(string);
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
    <div className='card' style={{ width: '18rem' }}>
      <img
        src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/${post.imageId}.jpg`}
        className='card-img-top'
        alt={post.title}
        href='#!'
        data-mdb-toggle='modal'
        // each modal needs to be named differently using letters, so we convert the index number to the associated character
        data-mdb-target={`#${String.fromCharCode(index + 65)}Modal`}
      />
      <div className='card-body'>
        <h5 className='card-title'>{post.title}</h5>
      </div>
      <ul className='list-group list-group-light list-group-small'>
        <li
          className='list-group-item px-4'
          data-mdb-toggle='modal'
          data-mdb-target='#LikesModal'
        >
          {post.likeCount} Likes
        </li>
        <UserList user={post.likes} listType='Likes' />
        <li className='list-group-item px-4'>{post.replyCount} Comments</li>
      </ul>
      {!userParam && (
        <>
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
                    // onClick={deletePost(post.imageId)}
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
  );
}

export default PostCard;
