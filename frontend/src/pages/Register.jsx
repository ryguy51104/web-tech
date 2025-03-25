import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // axios is used so that backend and frontend can communicate
            // send a POST request to the server with data
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                password,
                confirmPassword,
            });

            // if the response is successful, navigate to the login page
            if (response.data.success) {
                navigate('/login');
                // if the response is unsuccessful, display an error message
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Error registering user');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    {/* captures the username input */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    {/* captures the password input */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* captures the confirm password input */}
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {/* displays error message */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* navigates to the login page */}
            <button onClick={() => navigate('/login')}>Already have an Account? Login here</button>
        </div>
    );
};

export default Register;
