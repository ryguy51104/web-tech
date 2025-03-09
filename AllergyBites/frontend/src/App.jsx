import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recipe from './pages/Recipe';
import AddData from './components/AddData';  // Updated import path
import ViewData from './components/view';  // Updated import path
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
        <Route path="/add" element={<AddData />} />  {/* Route to add data */}
        <Route path="/view" element={<ViewData />} />  {/* Route to view data */}
      </Routes>
    </div>
  );
}

export default App;
