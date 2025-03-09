import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Call the /profile endpoint to check if the user is authenticated
                const response = await axios.get("http://localhost:5000/api/users/profile", {
                    withCredentials: true,
                });
                // If the server responds successfully, the user is authenticated
                if (response.data.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Done checking
            }
        };

        checkAuthentication();
    }, []);

    // While checking the authentication, show a loading message
    if (loading) return <h2>Loading...</h2>;

    // If authenticated, render the children (the Profile component)
    if (isAuthenticated) {
        return children;
    }

    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
};

export default PrivateRoute;

