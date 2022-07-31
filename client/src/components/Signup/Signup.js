import styles from './styles.module.css';
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
            <h4>Sign Up</h4>
            <form className={styles.signupForm} onSubmit={handleFormSubmit}>
                <input
                    className='form-input'
                    placeholder='Your username'
                    name='username'
                    type='username'
                    id='username'
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    placeholder='Your email'
                    name='email'
                    type='email'
                    id='email'
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    placeholder='******'
                    name='password'
                    type='password'
                    id='password'
                    value={formState.password}
                    onChange={handleChange}
                />
                <button className='btn d-block w-100' type='submit'>
                    Submit
                </button>
            </form>
            {error && <div>Sign up failed</div>}
        </main>
    );
};