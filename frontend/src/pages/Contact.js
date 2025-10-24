import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions you might have</p>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">&#128231;</div>
              <h3>Email</h3>
              <p>info@homecarejobs.com</p>
              <p>support@homecarejobs.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">&#128222;</div>
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
              <p>Mon-Fri: 9:00 AM - 6:00 PM EST</p>
            </div>

            <div className="info-card">
              <div className="info-icon">&#128205;</div>
              <h3>Address</h3>
              <p>123 Care Street</p>
              <p>City, State 12345</p>
            </div>

            <div className="info-card">
              <div className="info-icon">&#128337;</div>
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            {submitted && (
              <div className="alert alert-success">
                Thank you for contacting us! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
