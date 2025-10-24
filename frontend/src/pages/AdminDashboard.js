import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [jobsRes, applicationsRes] = await Promise.all([
        axios.get('/api/jobs'),
        axios.get('/api/applications')
      ]);
      setJobs(jobsRes.data);
      setApplications(applicationsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`/api/jobs/${jobId}`);
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        alert('Failed to delete job');
      }
    }
  };

  const handleUpdateJobStatus = async (jobId, status) => {
    try {
      const response = await axios.put(`/api/jobs/${jobId}`, { status });
      setJobs(jobs.map(job => job.id === jobId ? response.data : job));
    } catch (error) {
      alert('Failed to update job status');
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await axios.put(`/api/applications/${applicationId}`, { status });
      setApplications(applications.map(app =>
        app.id === applicationId ? response.data : app
      ));
    } catch (error) {
      alert('Failed to update application status');
    }
  };

  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : 'Unknown Job';
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage jobs and applications</p>
      </div>

      <div className="container">
        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Jobs ({jobs.length})
          </button>
          <button
            className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({applications.length})
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="jobs-section">
            <h2>Posted Jobs</h2>
            {jobs.length === 0 ? (
              <p className="empty-message">No jobs posted yet.</p>
            ) : (
              <div className="admin-table">
                {jobs.map(job => (
                  <div key={job.id} className="admin-card">
                    <div className="admin-card-header">
                      <div>
                        <h3>{job.title}</h3>
                        <p className="job-meta">
                          {job.location} • {job.type} • {job.salary}
                        </p>
                      </div>
                      <span className={`status-badge ${job.status}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="admin-card-body">
                      <p className="job-description">{job.description}</p>
                      <div className="job-stats">
                        <span>Applications: {job.applicationsCount || 0}</span>
                        <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="admin-card-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleUpdateJobStatus(
                          job.id,
                          job.status === 'active' ? 'inactive' : 'active'
                        )}
                      >
                        {job.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>Job Applications</h2>
            {applications.length === 0 ? (
              <p className="empty-message">No applications received yet.</p>
            ) : (
              <div className="admin-table">
                {applications.map(app => (
                  <div key={app.id} className="admin-card">
                    <div className="admin-card-header">
                      <div>
                        <h3>{app.fullName}</h3>
                        <p className="app-meta">
                          Applied for: {getJobTitle(app.jobId)}
                        </p>
                      </div>
                      <span className={`status-badge ${app.status}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="admin-card-body">
                      <div className="applicant-info">
                        <p><strong>Email:</strong> {app.email}</p>
                        <p><strong>Phone:</strong> {app.phone}</p>
                        <p><strong>Applied:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="cover-letter">
                        <strong>Cover Letter:</strong>
                        <p>{app.coverLetter}</p>
                      </div>
                      {app.resume && (
                        <div className="resume-link">
                          <a
                            href={`http://localhost:5000/uploads/${app.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                          >
                            View Resume
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="admin-card-actions">
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdateApplicationStatus(app.id, 'accepted')}
                        disabled={app.status === 'accepted'}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                        disabled={app.status === 'rejected'}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
