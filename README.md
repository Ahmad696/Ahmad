# HomeCare Jobs Portal

A full-stack web application for connecting home care caregivers with families in need of care services. This platform features job posting, job search, and application management capabilities.

## Features

### For Job Seekers (Caregivers)
- Browse available home care positions
- Search and filter jobs by location, type, and keywords
- View detailed job descriptions with requirements and benefits
- Apply for jobs with resume upload and cover letter
- Track application status

### For Employers (Families)
- Post job opportunities for caregivers
- Manage job listings (activate/deactivate/delete)
- View and manage applications
- Accept or reject applicants
- Download applicant resumes

### General Features
- Responsive design for mobile and desktop
- Modern, user-friendly interface
- Admin dashboard for managing all jobs and applications
- Real-time application counting
- File upload support for resumes (PDF, DOC, DOCX)

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS3 with responsive design

### Backend
- Node.js
- Express.js
- Multer for file uploads
- JSON file-based storage

## Project Structure

```
home-care-job-portal/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── package.json        # Backend dependencies
│   ├── data/               # JSON storage for jobs and applications
│   └── uploads/            # Uploaded resume files
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable components (Header, Footer)
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   ├── App.css         # Global styles
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── package.json            # Root package.json with scripts
└── README.md               # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd Ahmad
```

2. Install all dependencies:
```bash
npm run install-all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the backend server:
```bash
npm start
```

### Running Separately

**Backend only:**
```bash
cd backend
npm start
```

**Frontend only:**
```bash
cd frontend
npm start
```

## API Endpoints

### Jobs

- `GET /api/jobs` - Get all active jobs (supports search, location, type filters)
- `GET /api/jobs/:id` - Get a specific job
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job

### Applications

- `GET /api/applications` - Get all applications
- `GET /api/jobs/:id/applications` - Get applications for a specific job
- `POST /api/applications` - Submit a new application (with file upload)
- `PUT /api/applications/:id` - Update application status

### Health Check

- `GET /api/health` - Server health check

## Usage Guide

### For Job Seekers

1. Visit the homepage
2. Click "Browse Jobs" or navigate to the Jobs page
3. Use search filters to find relevant positions
4. Click on a job to view full details
5. Click "Apply Now" and fill out the application form
6. Upload your resume and submit

### For Employers

1. Navigate to "Post a Job"
2. Fill out the job posting form with all details
3. Submit the job posting
4. Access the Admin Dashboard to manage jobs and applications
5. Review applications and accept/reject candidates

### Admin Dashboard

Access the admin dashboard at `/admin` to:
- View all posted jobs
- Activate/deactivate job listings
- Delete job postings
- Review all applications
- Accept or reject applicants
- Download applicant resumes

## Features in Detail

### Job Posting
- Title, description, requirements, responsibilities
- Location and salary information
- Employment type (full-time, part-time, contract)
- Benefits and additional information

### Job Search
- Keyword search across title and description
- Location-based filtering
- Employment type filtering
- Real-time search results

### Application System
- Online application form
- Resume upload (PDF, DOC, DOCX up to 5MB)
- Cover letter submission
- Application status tracking
- Email and phone contact information

### Admin Management
- Job status management (active/inactive)
- Application review interface
- Applicant contact information
- Resume viewing and download
- Application status updates (pending/accepted/rejected)

## Data Storage

The application uses JSON files for data persistence:
- `backend/data/jobs.json` - Stores all job postings
- `backend/data/applications.json` - Stores all applications
- `backend/uploads/` - Stores uploaded resume files

**Note:** For production use, consider migrating to a proper database (MongoDB, PostgreSQL, etc.)

## Customization

### Styling
- Modify CSS files in `frontend/src/` to customize appearance
- Color scheme uses purple/blue gradient (#667eea to #764ba2)
- Fully responsive design with mobile-first approach

### Features
- Add user authentication system
- Integrate email notifications
- Add payment processing for premium listings
- Implement advanced search with more filters
- Add messaging system between employers and caregivers

## Security Considerations

For production deployment:
1. Add authentication and authorization
2. Implement rate limiting
3. Add input validation and sanitization
4. Use environment variables for configuration
5. Implement HTTPS
6. Add CSRF protection
7. Secure file upload validation
8. Migrate to a proper database with encryption

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues:
- Email: info@homecarejobs.com
- Phone: (555) 123-4567

## Future Enhancements

- User authentication and profiles
- Email notifications for applications
- Real-time chat between employers and caregivers
- Advanced filtering and sorting options
- Calendar integration for scheduling
- Rating and review system
- Mobile app version
- Integration with background check services
- Payment processing for featured listings
- Analytics dashboard for employers

## Acknowledgments

Built with React, Express, and modern web technologies to serve the home care community.
