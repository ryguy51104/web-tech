import React from 'react';
import { useNavigate } from 'react-router-dom';

// Home pageg
const HomePage = () => {
    // is used to navigate to different pages
    const navigate = useNavigate();
    // returns html code
    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            {/* Redirects to the register page */}
            <button onClick={() => navigate('/register')}>No Account yet? Register here</button>
            {/* Redirects to the login page */}
            <button onClick={() => navigate('/login')}>Already have an Account? Login here</button>
            {/* Redirects to the profile page */}
            <button onClick={() => navigate('/profile')}>My Profile</button>
        </div>
    );
};

export default HomePage;
