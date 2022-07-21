import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PostCard from '../components/PostCard';
import { QUERY_TOP_POSTS } from '../utils/queries';

function Discover() {
  const [postState, setPostState] = useState([]);
  const { loading, data } = useQuery(QUERY_TOP_POSTS);
  var posts = data?.topPosts || {};

  useEffect(() => {
    if (posts.length > 1) {
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      }

      setPostState(
        // randomize the order of the posts
        shuffle(posts.slice())
      );
    }
  }, [posts]);

  return (
    <div>
      <h1 className='mt-5 text-center'>Discover</h1>
      <div className='row mt-2'>
        {postState.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Discover;
