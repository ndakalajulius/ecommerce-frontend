import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing the CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Commerce
        </Link>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Login" className="navbar-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/checkout" className="navbar-link">Checkout</Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">Profile</Link>
          </li>
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
