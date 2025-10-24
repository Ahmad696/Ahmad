import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [resume, setResume] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to load job details' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const formDataToSend = new FormData();
    formDataToSend.append('jobId', id);
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('coverLetter', formData.coverLetter);
    if (resume) {
      formDataToSend.append('resume', resume);
    }

    try {
      await axios.post('/api/applications', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully! We will contact you soon.'
      });
      setFormData({ fullName: '', email: '', phone: '', coverLetter: '' });
      setResume(null);
      setShowApplicationForm(false);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="container">
        <div className="error-message">Job not found</div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="container">
        {submitStatus.message && (
          <div className={`alert alert-${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="job-details-card">
          <div className="job-details-header">
            <div>
              <h1>{job.title}</h1>
              <p className="job-meta">
                <span className="meta-item">&#128205; {job.location}</span>
                <span className="meta-item">&#128176; {job.salary}</span>
                <span className={`job-type ${job.type}`}>{job.type}</span>
              </p>
            </div>
            <button
              className="btn btn-primary btn-large"
              onClick={() => setShowApplicationForm(!showApplicationForm)}
            >
              {showApplicationForm ? 'Cancel' : 'Apply Now'}
            </button>
          </div>

          {showApplicationForm && (
            <div className="application-form-section">
              <h2>Apply for this Position</h2>
              <form onSubmit={handleSubmit} className="application-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
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
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cover Letter *</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Tell us why you're a great fit for this position..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Resume (PDF, DOC, DOCX - Max 5MB) *</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-large"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}

          <div className="job-details-content">
            <section>
              <h2>Job Description</h2>
              <p>{job.description}</p>
            </section>

            {job.requirements && (
              <section>
                <h2>Requirements</h2>
                <p>{job.requirements}</p>
              </section>
            )}

            {job.responsibilities && (
              <section>
                <h2>Responsibilities</h2>
                <p>{job.responsibilities}</p>
              </section>
            )}

            {job.benefits && (
              <section>
                <h2>Benefits</h2>
                <p>{job.benefits}</p>
              </section>
            )}

            <section className="job-info">
              <h2>Additional Information</h2>
              <ul>
                <li><strong>Employment Type:</strong> {job.type}</li>
                <li><strong>Location:</strong> {job.location}</li>
                <li><strong>Salary:</strong> {job.salary}</li>
                <li><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</li>
                <li><strong>Applications:</strong> {job.applicationsCount || 0}</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="back-button-container">
          <button onClick={() => navigate('/jobs')} className="btn btn-secondary">
            ← Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
