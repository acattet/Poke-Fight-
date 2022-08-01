import styles from './styles.module.css';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth.js';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import React, { useState } from 'react';

export const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

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
        const { data } = await addUser({
            variables: { ...formState }
        });
        
        Auth.login(data.addUser.token);
        } catch (e) {
        console.error(e);
        }
    };

    return (
        <main className={styles.main}>
            <h1>Sign Up</h1>
            <form className={styles.signupForm} onSubmit={handleFormSubmit}>
                <input
                    className={styles.formInput}
                    placeholder='Your username'
                    name='username'
                    type='username'
                    id='username'
                    value={formState.username}
                    onChange={handleChange}
                />
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
            <p>Already have an account?</p>
            <Link to="/login">
              <button className={styles.startButton}>
                Login!
              </button>
            </Link>
            {error && <div>Sign up failed</div>}
        </main>
    );
};