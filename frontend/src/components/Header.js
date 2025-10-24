import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>HomeCare Jobs</h1>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/jobs" className="nav-link">Find Jobs</Link>
            <Link to="/post-job" className="nav-link">Post a Job</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/admin" className="nav-link admin-link">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
