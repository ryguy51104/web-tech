import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // Add the following code to the Login component:
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // use the useNavigate hook to navigate to the home page after a successful login
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // prevents the default form submission behavior
        e.preventDefault();

        // resets the error state
        setError('');

        try {
            // sends a POST request to the server with the username and password and stores
            // the response in the response variable
            const response = await axios.post('http://localhost:5000/api/users/login',
                { username, password, },
                // enable cookies
                { withCredentials: true, }
            );

            // successfully logged in, navigate to the home page
            if (response.data.success) {
                navigate('/');
            
            // failed to log in, display an error message and reset password field
            } else {
                setError(response.data.message);
                console.log(response.data);
                setPassword('');
            }
        } catch (error) {
            setError('Invalid username or password');
            setPassword('');
        }
    };

    // renders the login form
    return (
        <div>
            <h2>Login</h2>
            {/* displays login form */}
            <form onSubmit={handleLogin}>
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
                {/* submits the form */}
                <button type="submit">Login</button>
            </form>
            {/* displays error message */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* navigates to the register page */}
            <button onClick={() => navigate('/register')}>No Account yet? Register here</button>
        </div>
    );
};

export default Login;
