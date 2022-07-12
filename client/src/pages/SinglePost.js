import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import { useParams } from 'react-router';

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });

  const post = data?.post || {};
  if (!loading) {
    console.log(post);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <div className='card mb-3'>
        <p className='card-heaeder'>
          <span style={{ fontweight: '650' }} className='text-light'>
            {post.username}
          </span>{' '}
          posted on {post.createdAt}
          <span>Posted by</span>
        </p>
        <div className='card-body'>
          <img
            src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/${post.imageId}.jpg`}
            className='card-img-top'
            alt={post.title}
          />
        </div>
        {/* Must not be available if a user is not logged in */}
        <div>Like Button</div>
        {/* Must not show up if a user is not logged in */}
        <div id='commentForm'>Comment Form</div>
        <div>Comments</div>
      </div>
    </main>
  );
};

export default SinglePost;
