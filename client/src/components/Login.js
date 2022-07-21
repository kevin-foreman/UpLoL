import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const { token } = data?.login || {};
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Email input */}
      <div className='form-outline mb-4'>
        <input
          type='email'
          id='form2Example1'
          className='form-control'
          name='email'
          onChange={handleChange}
        />
        <label className='form-label' htmlFor='form2Example1'>
          Email address
        </label>
      </div>

      {/* Password input */}
      <div className='form-outline mb-4'>
        <input
          type='password'
          id='form2Example2'
          className='form-control'
          name='password'
          onChange={handleChange}
        />
        <label className='form-label' htmlFor='form2Example2'>
          Password
        </label>
      </div>

      {/* Submit button */}
      <button type='submit' className='btn btn-primary btn-block mb-4'>
        Sign in
      </button>
      {error ? (
        <div>
          <p className='btn bg-danger text-white btn-block mb-4'>
            The provided credentials are incorrect
          </p>
        </div>
      ) : null}
    </form>
  );
};

export default Login;
