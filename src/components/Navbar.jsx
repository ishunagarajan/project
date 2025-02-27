// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Doc - Collab</div>
      <div className="nav-links">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/editor" className="nav-btn">Editor</Link>
      </div>
    </nav>
  );
};

export default Navbar;
