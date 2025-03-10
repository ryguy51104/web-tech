import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // check if passwords match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // axios is used so that backend and frontend can communicate
            // send a PUT request to the server with data
            const response = await axios.put('http://localhost:5000/api/users/change-password',
                { oldPassword, newPassword }
            );

            // if the response is successful, navigate to the home page
            if (response.data.success) {
                navigate('/');
                // if the response is unsuccessful, display an error message
            } else {
                setError(response.data.message);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            setError('Error changing password user');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
                <div>
                    <label>Old Password:</label>
                    {/* captures the old password input */}
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    {/* captures the password input */}
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* captures the confirm password input */}
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {/* displays error message */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default ChangePassword;
