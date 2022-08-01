import styles from './styles.module.css';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import React, { useState } from 'react';

export const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await login({
          variables: { ...formState }
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };
  
    return (
        <main className={styles.main}>
            <h1>Login</h1>
            <form className={styles.loginForm} onSubmit={handleFormSubmit}>
                <input
                    className={styles.formInput}
                    placeholder='Your email'
                    name='email'
                    type='email'
                    id='email'
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    className={styles.formInput}
                    placeholder='******'
                    name='password'
                    type='password'
                    id='password'
                    value={formState.password}
                    onChange={handleChange}
                />
                <button className={styles.startButton} type='submit'>
                    Submit
                </button>
            </form>
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className={styles.startButton}>
                Sign up!
              </button>
            </Link>
            {error && <div>Login failed</div>}
        </main>
    );
};