import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import { useParams } from 'react-router';

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <main>
      <div className='card mb-3'>
        <p className='card-heaeder'>
          <span style={{ fontweight: 650 }} className='text-light'>
            {post.username}
          </span>{' '}
          posted on {post.createdAt}
        </p>
        <div className='card-body'>
          <p>{post.postContent}</p>
        </div>

      </div>
    </main>
  );
};

export default SinglePost;
