const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create necessary directories
const dirs = ['data', 'uploads'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc and .docx files are allowed'));
    }
  }
});

// Data file paths
const jobsFile = path.join(__dirname, 'data', 'jobs.json');
const applicationsFile = path.join(__dirname, 'data', 'applications.json');

// Initialize data files if they don't exist
if (!fs.existsSync(jobsFile)) {
  fs.writeFileSync(jobsFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(applicationsFile)) {
  fs.writeFileSync(applicationsFile, JSON.stringify([], null, 2));
}

// Helper functions
const readJobs = () => {
  const data = fs.readFileSync(jobsFile, 'utf8');
  return JSON.parse(data);
};

const writeJobs = (jobs) => {
  fs.writeFileSync(jobsFile, JSON.stringify(jobs, null, 2));
};

const readApplications = () => {
  const data = fs.readFileSync(applicationsFile, 'utf8');
  return JSON.parse(data);
};

const writeApplications = (applications) => {
  fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));
};

// Routes

// Get all jobs
app.get('/api/jobs', (req, res) => {
  try {
    const jobs = readJobs();
    const { search, location, type } = req.query;

    let filteredJobs = jobs.filter(job => job.status === 'active');

    if (search) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }

    res.json(filteredJobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get single job
app.get('/api/jobs/:id', (req, res) => {
  try {
    const jobs = readJobs();
    const job = jobs.find(j => j.id === req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Create new job
app.post('/api/jobs', (req, res) => {
  try {
    const jobs = readJobs();
    const newJob = {
      id: uuidv4(),
      ...req.body,
      status: 'active',
      createdAt: new Date().toISOString(),
      applicationsCount: 0
    };

    jobs.push(newJob);
    writeJobs(jobs);

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Update job
app.put('/api/jobs/:id', (req, res) => {
  try {
    const jobs = readJobs();
    const index = jobs.findIndex(j => j.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }

    jobs[index] = {
      ...jobs[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    writeJobs(jobs);
    res.json(jobs[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete job
app.delete('/api/jobs/:id', (req, res) => {
  try {
    const jobs = readJobs();
    const filteredJobs = jobs.filter(j => j.id !== req.params.id);

    if (jobs.length === filteredJobs.length) {
      return res.status(404).json({ error: 'Job not found' });
    }

    writeJobs(filteredJobs);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// Submit job application
app.post('/api/applications', upload.single('resume'), (req, res) => {
  try {
    const applications = readApplications();
    const jobs = readJobs();

    const newApplication = {
      id: uuidv4(),
      jobId: req.body.jobId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      coverLetter: req.body.coverLetter,
      resume: req.file ? req.file.filename : null,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    applications.push(newApplication);
    writeApplications(applications);

    // Update job applications count
    const jobIndex = jobs.findIndex(j => j.id === req.body.jobId);
    if (jobIndex !== -1) {
      jobs[jobIndex].applicationsCount = (jobs[jobIndex].applicationsCount || 0) + 1;
      writeJobs(jobs);
    }

    res.status(201).json(newApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get applications for a job
app.get('/api/jobs/:id/applications', (req, res) => {
  try {
    const applications = readApplications();
    const jobApplications = applications.filter(app => app.jobId === req.params.id);
    res.json(jobApplications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get all applications
app.get('/api/applications', (req, res) => {
  try {
    const applications = readApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Update application status
app.put('/api/applications/:id', (req, res) => {
  try {
    const applications = readApplications();
    const index = applications.findIndex(app => app.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }

    applications[index] = {
      ...applications[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    writeApplications(applications);
    res.json(applications[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
