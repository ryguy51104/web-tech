import React from 'react';
import { useNavigate } from 'react-router-dom';

const handleLogout = () => {
    axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true })
.then(response => console.log(response.data))
.catch(error => console.error(error.response.data));

    navigate('/');
}

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            {/* Redirects to the register page */}
            <button onClick={() => navigate('/register')}>No Account yet? Register here</button>
            {/* Redirects to the login page */}
            <button onClick={() => navigate('/login')}>Already have an Account? Login here</button>

            {/* Logs out the user */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;
