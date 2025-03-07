import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/profile", {
                    withCredentials: true,
                });

                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data);
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>Welcome, {user.username}!</h1>
            <button onClick={() => {
                axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true })
                    .then(() => navigate("/login"))
                    .catch(err => console.error("Logout error:", err));
            }}>Logout</button>
        </div>
    );
};

export default Profile;

