import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About HomeCare Jobs</h1>
        <p>Connecting caregivers with families since 2024</p>
      </div>

      <div className="container">
        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At HomeCare Jobs, our mission is to connect compassionate and qualified caregivers
              with families in need of quality home care services. We believe that everyone deserves
              access to dignified, professional care in the comfort of their own home.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Do</h2>
            <p>
              We provide a platform that makes it easy for families to find experienced caregivers
              and for caregivers to find meaningful employment opportunities. Our service streamlines
              the hiring process, ensuring that both parties can connect quickly and efficiently.
            </p>
          </section>

          <section className="about-section">
            <h2>Why Choose Us</h2>
            <div className="features-list">
              <div className="feature-item">
                <h3>Trusted Platform</h3>
                <p>We carefully review all job postings to ensure they meet our standards for quality and professionalism.</p>
              </div>
              <div className="feature-item">
                <h3>Easy to Use</h3>
                <p>Our intuitive interface makes it simple to post jobs, search for positions, and submit applications.</p>
              </div>
              <div className="feature-item">
                <h3>Quality Matches</h3>
                <p>Our search and filtering tools help connect the right caregivers with the right families.</p>
              </div>
              <div className="feature-item">
                <h3>Support</h3>
                <p>Our team is here to help both caregivers and families throughout the hiring process.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <ul className="values-list">
              <li><strong>Compassion:</strong> We believe in treating everyone with kindness and respect.</li>
              <li><strong>Quality:</strong> We are committed to maintaining high standards in all our services.</li>
              <li><strong>Integrity:</strong> We operate with honesty and transparency in all our interactions.</li>
              <li><strong>Community:</strong> We strive to build a supportive community of caregivers and families.</li>
            </ul>
          </section>

          <section className="about-section cta-section">
            <h2>Join Our Community</h2>
            <p>
              Whether you're a caregiver looking for your next opportunity or a family seeking
              compassionate care, we're here to help you succeed.
            </p>
            <div className="cta-buttons">
              <a href="/jobs" className="btn btn-primary">Find Jobs</a>
              <a href="/post-job" className="btn btn-secondary">Post a Job</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
