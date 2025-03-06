import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to My App</h2>
      <p>Explore recipes and more!</p>
      <Link to="/recipe" className="recipe-link">Recipes</Link>
    </div>
  );
};

export default Home;