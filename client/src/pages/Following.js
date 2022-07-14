import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_FOLLOWED_USER_POSTS } from '../utils/queries';
import PostCard from '../components/PostCard';

const Following = () => {
  const [postState, setPostState] = useState([]);
  const { loading, data } = useQuery(QUERY_FOLLOWED_USER_POSTS);

  const users = data?.posts || [];

  // set the state of the posts
  useMemo(() => {
    if (users) {
      users.forEach((user) => {
        user.posts.forEach((post) => {
          // console.log(post);
          setPostState((currentState) => {
            // console.log('currentState: ', currentState);
            return [
              ...currentState,
              {
                name: user.name,
                username: post.username,
                imageId: post.imageId,
                likeCount: post.likeCount,
                replyCount: post.replyCount,
                title: post.title,
                createdAt: post.createdAt,
                _id: post._id,
              },
            ];
          });
        });
      });
    }
    // console.log(postState);
  }, [users]);

  if (!Auth.loggedIn()) return <Navigate to='/' />;

  return (
    <div>
      <h1 className='mt-5 text-center'>Following</h1>
      {!loading && !users.length && !postState.length ? (
        <h2 className='mt-2 text-center'>No Posts to See</h2>
      ) : (
        <div className='row mt-2'>
          {postState.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Following;
