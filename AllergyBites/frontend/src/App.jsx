import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import PrivateRoute from './pages/PrivateRoute';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div>
      <h1>AllergyBites</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/recipes" element={<Recipes />} />
        {/* Add a private route for the Profile component */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

