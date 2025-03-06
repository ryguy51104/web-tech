import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            <button onClick={() => navigate('/register')}>No Account yet? Register here</button>
            <button onClick={() => navigate('/login')}>Already have an Account? Login here</button>
        </div>
    );
};

export default HomePage;
