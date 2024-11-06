import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      {isLoggedIn ? (
        <>
          <Link to="/upload">Upload Recipe</Link>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
