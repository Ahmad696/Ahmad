import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Jobs.css';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, locationFilter, typeFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (locationFilter) params.location = locationFilter;
      if (typeFilter) params.type = typeFilter;

      const response = await axios.get('/api/jobs', { params });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Find Your Perfect Home Care Position</h1>
        <p>Browse available positions and apply today</p>
      </div>

      <div className="container">
        <div className="search-section">
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="search-input"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="search-select"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">
            <h3>No jobs found</h3>
            <p>Try adjusting your search filters or check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className={`job-type ${job.type}`}>{job.type}</span>
                </div>
                <div className="job-details">
                  <p className="job-location">&#128205; {job.location}</p>
                  <p className="job-salary">&#128176; {job.salary}</p>
                  <p className="job-description">{job.description.substring(0, 150)}...</p>
                </div>
                <div className="job-footer">
                  <span className="applications-count">
                    {job.applicationsCount || 0} applications
                  </span>
                  <Link to={`/jobs/${job.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
