import React from 'react';
import { useNavigate } from 'react-router-dom';

// Handle logout
const handleLogout = async () => {
    try {
        await axios.post("http://localhost:5000/api/users/logout", {
            withCredentials: true,
        });
        setIsAuthenticated(false);
        navigate('/');
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
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
            <button onClick={() => navigate('/recipes')}>Find Recipes</button>
            <button onClick={() => handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;
