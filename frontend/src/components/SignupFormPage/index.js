import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignUpFormPage.css'

const SignUpFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [first_name, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ first_name, email, zip, password}))
                .catch((res) => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                })
        }
        return setErrors(['Confirm Password field must be the same as the Password field'])
    }

    return (
        <div className="signup-page-container">
            <div className="signup-form-container">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li className="errs" key={idx}>{error}</li>)}
                    </ul>
                    <div>
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="Zip Code"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpFormPage;
