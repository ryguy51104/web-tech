import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Navbar.module.css';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Check authentication status
    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/auth',
                { withCredentials: true, });
            setIsAuthenticated(response.data.isAuthenticated);
            console.log("Authenticated:", response.data.isAuthenticated);
        } catch (error) {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [location]);

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/users/logout",
                {},
                { withCredentials: true, });
            setIsAuthenticated(false);
            navigate('/');

        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div>
                <h1>AllergyBites</h1>
                <ul>
                    {/* Home Button */}
                    <li>
                        <button onClick={() => navigate('/')}>Home</button>
                    </li>
                    {/* Recipes Button */}
                    <li>
                        <button onClick={() => navigate('/recipes')}>Find Recipes</button>
                    </li>

                    {/* Profile / Login or Logout Button */}
                    {isAuthenticated ? (
                        location.pathname === "/profile" ? (
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={() => navigate('/profile')}>Profile</button>
                            </li>
                        )
                    ) : (
                        <li>
                            <button onClick={() => navigate('/login')}>Login</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

