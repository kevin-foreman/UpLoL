import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PostCard from '../components/PostCard';
import { QUERY_TOP_POSTS } from '../utils/queries';

const Home = () => {
  const [postState, setPostState] = useState([]);
  const { loading, data } = useQuery(QUERY_TOP_POSTS);
  var posts = data?.topPosts || {};

  useEffect(() => {
    if (posts.length > 1) {
      setPostState(
        // sort the posts to obtain the top 4 most user-interacted posts
        posts
          .slice()
          .sort(
            (postA, postB) =>
              postA.likeCount +
              postA.replyCount -
              postB.likeCount -
              postB.replyCount
          )
          .slice(-3)
          .reverse()
      );
    }
  }, [posts]);

  return (
    <>
      <div id='preview' className='preview'>
        <div style={{ display: 'none' }}></div>
        <div>
          <div
            data-draggable='true'
            style={{ position: 'relative' }}
            draggable='false'
            className=''
          >
            <section
              draggable='false'
              className='overflow-hidden pt-0'
              data-v-271253ee=''
            >
              <section className='mb-10 text-center text-lg-start'>
                <div className='container py-4'>
                  <div className='row g-0 align-items-center'>
                    <div className='col-lg-6 mb-5 mb-lg-0'>
                      <div
                        className='card cascading-right'
                        style={{
                          background: 'hsla(0, 0%, 100%, 0.55)',
                          backdropFilter: 'blur(30px)',
                        }}
                      >
                        <div className='card-body px-4 pb-5 pt-md-0 px-md-5 shadow-5'>
                          <h1 className='my-5 display-4 fw-bold ls-tight'>
                            <span>Welcome to UpLoL</span>
                            <br />
                            <span className='text-primary'>
                              The Social
                              <br />
                              MEMEdia
                              <br />
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 mb-5 mb-lg-0'>
                      <img
                        src='https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw5NjI0M3wwfDF8c2VhcmNofDZ8fGZ1bm55JTIwZG9nfGVufDB8fHx8MTY1NzE1NTg4OA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080'
                        className='w-100 rounded-4 shadow-4'
                        alt='Logo'
                        aria-controls='#picker-editor'
                        draggable='false'
                      />
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
          {/* Display the top posts */}
          <div className='mx-1'>
            <h1 className='mt-5 fw-bold text-center'>Top Posts</h1>
            {postState.length && (
              <div className='row mt-2'>
                {postState.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>

          <div
            data-draggable='true'
            style={{ position: 'relative' }}
            draggable='false'
            className=''
          >
            <section
              draggable='false'
              className='container pt-5'
              data-v-271253ee=''
            >
              <section className='mb-10 text-center'>
                <h2 className='fw-bold mb-5 text-center'>
                  {' '}
                  <span className='me-1'>Created by:</span>
                  <u className='text-primary'></u>{' '}
                </h2>
                <div className='row gx-lg-5'>
                  <div className='col-md-4 mb-5 mb-md-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong d-inline-block mb-4'>
                      <i
                        className='fas fa-brain fa-lg text-white fa-fw'
                        aria-controls='#picker-editor'
                      ></i>
                    </div>
                    <a
                      href='https://github.com/ArchieDonaho'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <h5 className='fw-bold mb-3'>Archie Donaho</h5>
                    </a>
                    <p className='text-muted mb-0'>
                      The mastermind behind this project.&nbsp;
                    </p>
                  </div>
                  <div className='col-md-4 mb-5 mb-md-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong d-inline-block mb-4'>
                      <i
                        className='fab fa-github fa-lg text-white fa-fw'
                        aria-controls='#picker-editor'
                      ></i>
                    </div>
                    <a
                      href='https://github.com/kevin-foreman'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <h5 className='fw-bold mb-3'>Kevin Foreman</h5>
                    </a>
                    <p className='text-muted mb-0'>
                      The Repo-master and team navigator
                    </p>
                  </div>
                  <div className='col-md-4 mb-5 mb-md-0'>
                    <div className='p-3 bg-primary rounded-4 shadow-2-strong d-inline-block mb-4'>
                      <i
                        className='fas fa-pencil-alt fa-lg text-white fa-fw'
                        aria-controls='#picker-editor'
                      ></i>
                    </div>
                    <a
                      href='https://github.com/Zurdoc8'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <h5 className='fw-bold mb-3'>Andres Garza</h5>
                    </a>
                    <p className='text-muted mb-0'>App design and creativity</p>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
