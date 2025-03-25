import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";

// Profile page
const Profile = () => {
    // Store the user data and the username
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    
    // Navigate to different pages
    const navigate = useNavigate();

    // Fetch the user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Calls the /profile endpoint to get the user profile
                const response = await axios.get("http://localhost:5000/api/users/profile", {
                    withCredentials: true,
                });

                // Sets the user state with the user data
                setUser(response.data.user);

                // Capitalize the first letter of the username
                const capitalizedUsername = response.data.user.username.charAt(0).toUpperCase() + response.data.user.username.slice(1);
                setUsername(capitalizedUsername);
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data);
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    // Wait for the user data to be fetched
    if (!user) return <h2>Loading...</h2>;

    // Return the user profile
    return (
        <div className={styles.profile}>
            <h1>Welcome, {username}!</h1>
            <button onClick={() => {
                navigate("/change-password");
            }}>Change Password</button>
        </div>
    );
};

export default Profile;

