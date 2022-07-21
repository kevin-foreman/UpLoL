import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(string) {
  var re = /\b(?=[a-zA-Z]*\d)(?=\d*[a-zA-Z])[^\s]{3,16}\b/g;
  return re.test(String(string).toLowerCase());
}

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [errorState, setErrorState] = useState('');
  const [emailErrorState, setEmailErrorState] = useState('');
  const [passwordErrorState, setPasswordErrorState] = useState('');
  const [addUser, { addUserError }] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
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
      console.log(err);
      setErrorState(addUserError.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailErrorState('Your email is invalid');
      } else {
        setEmailErrorState('');
      }
    } else if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordErrorState(
          'Password must contain 3-16 characters and a mix of letter & numeric characters'
        );
      } else {
        setPasswordErrorState('');
      }
    }

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
            <label className='form-label' htmlFor='form3Example1'>
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
            <label className='form-label' htmlFor='form3Example2'>
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
        <label className='form-label' htmlFor='form3Example3'>
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
        <label className='form-label' htmlFor='form3Example4'>
          Password
        </label>
      </div>
      {emailErrorState && (
        <div className='btn btn-danger text-light btn-block mb-4'>
          {emailErrorState}
        </div>
      )}
      {passwordErrorState && (
        <div className='btn btn-danger text-light btn-block mb-4'>
          {passwordErrorState}
        </div>
      )}
      {errorState && (
        <div className='btn btn-danger text-light btn-block mb-4'>
          {errorState}
        </div>
      )}

      {!emailErrorState && !passwordErrorState && (
        <button type='submit' className='btn btn-primary btn-block mb-4'>
          Sign up
        </button>
      )}
    </form>
  );
};

export default Signup;
