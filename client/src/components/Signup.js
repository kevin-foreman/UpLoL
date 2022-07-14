import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('submitting form');
    try {
      const { data } = await addUser({
        variables: {
          name: formState.name,
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const { token } = data?.addUser || {};
      console.log(token);
      Auth.login(token);
    } catch (err) {
      console.log('could not submit form');
    }
  };

  if (error) {
    console.log(error);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='row mb-4'>
        {/* Username input */}
        <div className='col'>
          <div className='form-outline'>
            <input
              type='text'
              id='form3Example1'
              className='form-control'
              name='username'
              onChange={handleChange}
            />
            <label className='form-label' for='form3Example1'>
              Username
            </label>
          </div>
        </div>

        {/* Name input */}
        <div className='col'>
          <div className='form-outline'>
            <input
              type='text'
              id='form3Example2'
              className='form-control'
              name='name'
              onChange={handleChange}
            />
            <label className='form-label' for='form3Example2'>
              Name
            </label>
          </div>
        </div>
      </div>

      {/* Email input */}
      <div className='form-outline mb-4'>
        <input
          type='email'
          id='form3Example3'
          className='form-control'
          name='email'
          onChange={handleChange}
        />
        <label className='form-label' for='form3Example3'>
          Email address
        </label>
      </div>

      {/* Password input */}
      <div className='form-outline mb-4'>
        <input
          type='password'
          id='form3Example4'
          className='form-control'
          name='password'
          onChange={handleChange}
        />
        <label className='form-label' for='form3Example4'>
          Password
        </label>
      </div>

      {/* Submit button */}
      <button type='submit' className='btn btn-primary btn-block mb-4'>
        Sign up
      </button>
    </form>
  );
};

export default Signup;
