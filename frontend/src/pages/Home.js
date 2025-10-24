import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Perfect Home Care Position</h1>
            <p>Connect with families seeking compassionate caregivers</p>
            <div className="hero-buttons">
              <Link to="/jobs" className="btn btn-primary btn-large">Browse Jobs</Link>
              <Link to="/post-job" className="btn btn-secondary btn-large">Post a Job</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose HomeCare Jobs?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">&#128101;</div>
              <h3>Quality Matches</h3>
              <p>We connect qualified caregivers with families who need their expertise</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128203;</div>
              <h3>Easy Application</h3>
              <p>Simple and straightforward application process for both caregivers and employers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128176;</div>
              <h3>Competitive Pay</h3>
              <p>Find positions that offer fair compensation for your valuable services</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128240;</div>
              <h3>Flexible Hours</h3>
              <p>Choose from full-time, part-time, and flexible scheduling options</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Browse Jobs</h3>
              <p>Search through available home care positions in your area</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Apply Online</h3>
              <p>Submit your application with your resume and cover letter</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Hired</h3>
              <p>Connect with families and start making a difference</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Home Care Journey?</h2>
            <p>Join our community of dedicated caregivers today</p>
            <Link to="/jobs" className="btn btn-primary btn-large">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
