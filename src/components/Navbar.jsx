import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css"; // Ensure styles are properly linked

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          DocCollab
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button">Sign Up</Link> 
      </div>
    </nav>
  );
};

export default Navbar;
