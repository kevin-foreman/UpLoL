import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import { LIKE_POST, ADD_COMMENT } from '../utils/mutations';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });

  const [likeButtonState, setLikeButtonState] = useState({
    liked: false,
  });
  const [commentsState, setCommentsState] = useState([]);
  const [commentFormState, setCommentFormState] = useState({
    postId: postId,
    commentText: '',
  });

  const [likePost] = useMutation(LIKE_POST);
  const [addComment] = useMutation(ADD_COMMENT);

  var user;
  var post;
  var displayComments = false;
  const postData = data?.post || {};
  if (!loading) {
    user = postData.user;
    post = postData.post;
    if (post.replyCount > 0) displayComments = true;
    // console.log(user, post);
  }

  useEffect(() => {
    if (post) {
      // console.log('post comments', post.comments);
      setCommentsState(post.comments);
      if (commentsState.length) {
        console.log('commentsState', commentsState);
      }
    }
  }, [post]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  function handleCommentForm(e) {
    setCommentFormState({ ...commentFormState, commentText: e.target.value });
  }

  function commentFormSubmit(e) {
    e.preventDefault();
    const { postId, commentText } = commentFormState;
    console.log(postId, commentText);
    if (!Auth.loggedIn()) {
      return;
    }
    addComment({
      variables: {
        postId: postId,
        commentText: commentText,
      },
    }).then((graphqlResponse) => {
      window.location.reload();
    });
  }

  return (
    <main>
      <div className='card mb-3'>
        <div className='row align-items-center mb-4'>
          <div className='col-lg-7 d-flex'>
            <div className='flex-shrink-0 mt-2 ms-2'>
              {user.profilePictureId ? (
                <>
                  <img
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/${user.profilePictureId}.jpg`}
                    width='100'
                    alt='user profile'
                    className='img-fluid border border-light rounded rounded-3 border-5'
                  />
                </>
              ) : (
                <>
                  <img
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/default-pfp_qbsiui.png`}
                    width='100'
                    alt='user profile'
                    className='img-fluid border border-light rounded rounded-3 border-5'
                  />
                </>
              )}
            </div>
            <h3 className='flex-grow-1 ms-3 mt-3 text-muted'>
              By: {user.name}{' '}
              <Link to={`/profile/${user.username}`}>@{user.username}</Link>
            </h3>
          </div>
        </div>
        <div className='card-body text-center'>
          <img
            src={`https://res.cloudinary.com/${process.env.REACT_APP_PROFILE_ID}/image/upload/v1657169752/${post.imageId}.jpg`}
            className='img-fluid shadow-1-strong rounded-1 mb-4'
            alt={post.title}
          />
        </div>
        {/* Must not be available if a user is not logged in */}
        {/* {Auth.loggedIn() && !likeButton.like && (
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
                setLikeButton({ like: true });
              }}
            >
              Like
            </button>
          </>
        )} */}
        {/* Render the Comments */}
        {Auth.loggedIn() && (
          <div className='row d-flex justify-content-center mt-4'>
            <div className='col-12 col-md-10'>
              <div
                className='card shadow-0 border'
                style={{ backgroundColor: '#f0f2f5' }}
              >
                <div id='commentForm' className='card-body p-4'>
                  {/* form to submit comments */}
                  <form
                    className='form-outline mb-4'
                    // onSubmit={commentFormSubmit}
                  >
                    <input
                      type='text'
                      id='addANote'
                      className='form-control'
                      placeholder='Type comment...'
                      onBlur={handleCommentForm}
                    />
                    <label className='form-label' for='addANote'>
                      say what you think...
                    </label>
                    <button
                      className='btn w-100 mt-2'
                      onClick={(e) => {
                        e.preventDefault();
                        const { postId, commentText } = commentFormState;
                        addComment({
                          variables: {
                            postId: postId,
                            commentText: commentText,
                          },
                        }).then((graphqlResponse) => {
                          setCommentsState([
                            ...commentsState,
                            graphqlResponse.data.addComment.comments[
                              graphqlResponse.data.addComment.comments.length -
                                1
                            ],
                          ]);
                        });
                      }}
                    >
                      Submit
                    </button>
                  </form>

                  {/* display all comments in order from newest to oldest */}
                  {displayComments &&
                    // [...post.comments].reverse().map((comment) => {
                    [...commentsState].reverse().map((comment, index) => {
                      // console.log(comment);
                      return (
                        <div key={index} className='card my-2'>
                          <div className='card-body'>
                            <p>{comment.commentText}</p>

                            <div className='d-flex justify-content-between'>
                              <div className='d-flex flex-row align-items-center'>
                                <img
                                  src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp'
                                  alt='avatar'
                                  width='25'
                                  height='25'
                                />

                                <Link
                                  to={`/profile/${comment.username}`}
                                  className='small mb-0 ms-2'
                                >
                                  {comment.name} @{comment.username}
                                </Link>
                              </div>
                              <div className='d-flex flex-row align-items-center'>
                                <p className='small text-muted mb-0'>
                                  {comment.createdAt}
                                </p>
                                {/* <i
                                  className='far fa-thumbs-up mx-2 fa-xs text-black'
                                  style={{ marginTop: '-0.16rem' }}
                                ></i>
                                <p className='small text-muted mb-0'>3</p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SinglePost;
