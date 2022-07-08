import React from 'react';

function PostCard(props) {
  const { post } = props;

  console.log(post);
  return (
    <div className='card' style={{ width: '18rem' }}>
      <img
        src={`https://res.cloudinary.com/dzmr76die/image/upload/v1657169752/${post.imageId}.jpg`}
        className='card-img-top'
        alt={post.title}
      />
      <div className='card-body'>
        <h5 className='card-title'>{post.title}</h5>
      </div>
      <ul className='list-group list-group-light list-group-small'>
        <li className='list-group-item px-4'>{post.likeCount} Likes</li>
        <li className='list-group-item px-4'>{post.replyCount} Comments</li>
      </ul>
    </div>
  );
}

export default PostCard;
