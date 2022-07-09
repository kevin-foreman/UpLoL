import React from 'react';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/client';
import UserList from './UserList';
import { REMOVE_POST } from '../utils/mutations';

function PostCard(props) {
  const { post, index } = props;
  // get the username from the parameter
  const { username: userParam } = useParams();

  const [removePost] = useMutation(REMOVE_POST);

  // when a user confirms an image deletion, remove it form the db and refresh the webpage
  async function deletePost(e) {
    try {
      await removePost({
        variables: { postId: e.target.dataset.id },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='card' style={{ width: '18rem' }}>
      <img
        src={`https://res.cloudinary.com/dzmr76die/image/upload/v1657169752/${post.imageId}.jpg`}
        className='card-img-top'
        alt={post.title}
        href='#!'
        data-mdb-toggle='modal'
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
                    data-id={post._id}
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
