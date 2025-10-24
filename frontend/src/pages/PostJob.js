import React, { useState } from 'react';
import axios from 'axios';
import './PostJob.css';

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    location: '',
    salary: '',
    type: 'full-time'
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      await axios.post('/api/jobs', formData);
      setSubmitStatus({
        type: 'success',
        message: 'Job posted successfully! It is now visible to candidates.'
      });
      setFormData({
        title: '',
        description: '',
        requirements: '',
        responsibilities: '',
        benefits: '',
        location: '',
        salary: '',
        type: 'full-time'
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to post job. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="post-job-page">
      <div className="page-header">
        <h1>Post a Job</h1>
        <p>Find the perfect caregiver for your home care needs</p>
      </div>

      <div className="container">
        {submitStatus.message && (
          <div className={`alert alert-${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="post-job-card">
          <form onSubmit={handleSubmit} className="post-job-form">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Live-in Caregiver, Personal Care Assistant"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., New York, NY"
                  required
                />
              </div>

              <div className="form-group">
                <label>Employment Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Salary Range *</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., $15-20/hour or $40,000-50,000/year"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of the position..."
                required
              />
            </div>

            <div className="form-group">
              <label>Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="List the qualifications and requirements for this position..."
              />
            </div>

            <div className="form-group">
              <label>Responsibilities</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                placeholder="Describe the day-to-day responsibilities..."
              />
            </div>

            <div className="form-group">
              <label>Benefits</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="List the benefits offered (health insurance, paid time off, etc.)..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={submitting}
            >
              {submitting ? 'Posting Job...' : 'Post Job'}
            </button>
          </form>
        </div>

        <div className="tips-section">
          <h2>Tips for Writing a Great Job Post</h2>
          <ul>
            <li>Be specific about the care needs and requirements</li>
            <li>Include clear information about schedule and hours</li>
            <li>Mention any special skills or certifications needed</li>
            <li>Be transparent about salary and benefits</li>
            <li>Describe the work environment and expectations</li>
            <li>Include contact information for questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
