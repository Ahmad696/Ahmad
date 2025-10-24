import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HomeCare Jobs</h3>
            <p>Connecting caregivers with families in need of quality home care services.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/jobs">Browse Jobs</a></li>
              <li><a href="/post-job">Post a Job</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@homecarejobs.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Care Street, City, State 12345</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 HomeCare Jobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
