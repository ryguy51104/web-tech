import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Profile page
const Profile = () => {
    // stores the user data
    const [user, setUser] = useState(null);
    // is used to navigate to different pages
    const navigate = useNavigate();

    // fetches the user profile
    useEffect(() => {
        // fetches the user profile
        const fetchProfile = async () => {
            try {
                // calls the /profile endpoint to get the user profile
                const response = await axios.get("http://localhost:5000/api/users/profile", {
                    // enable cookies
                    withCredentials: true,
                });

                // sets the user state with the user data
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data);
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    // waits for the user data to be fetched
    if (!user) return <h2>Loading...</h2>;

    // returns the user profile
    return (
        <div>
            <h1>Welcome, {user.username}!</h1>
            <button onClick={() => {
                navigate("/change-password");
            }}>Change Password</button>
            <button onClick={() => {
                navigate("/");
            }}>Home</button>
            <button onClick={() => {
                axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true })
                    .then(() => navigate("/login"))
                    .catch(err => console.error("Logout error:", err));
            }}>Logout</button>
        </div>
    );
};

export default Profile;

