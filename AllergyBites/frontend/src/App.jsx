import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import Register from './pages/Register';
import Recipe from './pages/Recipe';
import './styles.css';

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <h1>
          <Link to="/">My App</Link>
        </h1>
        <div className="auth-buttons">
          <Link to="/login" className="btn">Sign In</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </div>
  );
}

export default App;