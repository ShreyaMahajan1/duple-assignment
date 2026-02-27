# ProManager - Project Management & Collaboration Tool

A full-stack project management application built with MERN stack, featuring real-time collaboration, Kanban boards, task management, and team coordination.

![ProManager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-latest-green.svg)

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure JWT-based authentication with refresh tokens
- **Project Management** - Create, update, and manage projects with team members
- **Board System** - Organize tasks using customizable boards within projects
- **Task Management** - Full CRUD operations with status tracking, priorities, and assignments
- **Kanban Board** - Drag-and-drop interface for visual task management
- **Team Collaboration** - Assign tasks, add comments, and track activity history
- **Search & Filter** - Advanced filtering by status, priority, assignee, and text search
- **Daily Progress** - Track team progress and provide rewards/warnings
- **Mobile Responsive** - Fully optimized for mobile and tablet devices

### Additional Features
- Category and subcategory organization
- Employee reward system with coins
- Profile management
- Activity history tracking
- Image upload support
- Real-time notifications
- Role-based access control (Admin/Employee)

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication (access & refresh tokens)
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Express-rate-limit** - API rate limiting
- **Dotenv** - Environment configuration

### Frontend
- **React.js** - UI library (v18.2.0)
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - HTTP client with interceptors
- **React Toastify** - Notifications
- **@hello-pangea/dnd** - Drag and drop for Kanban
- **Bootstrap** - UI framework
- **FontAwesome** - Icons
- **Moment.js** - Date formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (v4.0 or higher) - Running locally or MongoDB Atlas account
- **Git** (optional, for cloning)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cypher-task-Innovate
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

**Backend Environment Variables (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/promanager
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local file
nano .env.local
```

**Frontend Environment Variables (.env.local):**
```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the Application

**Option A: Run Both Servers Separately**

```bash
# Terminal 1 - Start Backend
cd backend
npm start
# Backend runs on http://localhost:5000

# Terminal 2 - Start Frontend
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

**Option B: Use the provided scripts (if available)**

```bash
# From root directory
npm run dev
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Default Admin Credentials:**
  - Email: `admin@gmail.com`
  - Password: `123`

## 📁 Project Structure

```
cypher-task-Innovate/
├── backend/
│   ├── server/
│   │   ├── apis/           # API modules
│   │   │   ├── auth/       # Authentication
│   │   │   ├── board/      # Board management
│   │   │   ├── category/   # Categories
│   │   │   ├── employee/   # Employee management
│   │   │   ├── project/    # Projects
│   │   │   ├── task/       # Tasks
│   │   │   └── ...
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Custom middleware
│   │   │   ├── errorHandler.js
│   │   │   ├── validator.js
│   │   │   ├── rateLimiter.js
│   │   │   └── tokenChecker.js
│   │   └── routes/         # API routes
│   ├── index.js            # Entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Admin/          # Admin components
│   │   ├── User/           # Employee components
│   │   ├── components/     # Shared components
│   │   │   ├── KanbanBoard.js
│   │   │   ├── Loader.js
│   │   │   └── ...
│   │   ├── context/        # Context API
│   │   │   ├── AuthContext.js
│   │   │   └── AppContext.js
│   │   ├── layout/         # Layout components
│   │   │   ├── Master.js
│   │   │   ├── Sidebar.js
│   │   │   ├── Footer.js
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   │   └── responsive.css
│   │   ├── utils/          # Utilities
│   │   │   └── axiosConfig.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.local
│
├── README.md
├── PROJECT_REQUIREMENTS_CHECKLIST.md
└── package.json
```

## 🔐 Authentication Flow

1. **Login** - User provides credentials
2. **Token Generation** - Server generates access token (1h) and refresh token (7d)
3. **Token Storage** - Tokens stored in sessionStorage
4. **Auto Refresh** - Axios interceptor automatically refreshes expired access tokens
5. **Logout** - Clears tokens and redirects to landing page

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Boards
- `GET /api/boards` - Get all boards
- `POST /api/boards` - Create board
- `GET /api/boards/:id` - Get single board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Tasks
- `GET /api/tasks` - Get all tasks (with pagination & filters)
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/comments` - Add comment
- `PUT /api/tasks/:id/status` - Update task status

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `GET /api/employees/:id` - Get single employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

*For complete API documentation, see [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) or import the Postman collection.*

## 🎨 Key Features Explained

### Kanban Board
- Drag-and-drop tasks between columns (Todo, In Progress, Done)
- Visual task cards with priority indicators
- Filter by project and board
- Real-time status updates

### Task Management
- Create tasks with title, description, priority, and deadline
- Assign tasks to team members
- Add comments and track activity history
- Update status through Kanban or manage task page
- Search and filter by multiple criteria

### Team Collaboration
- Create project teams
- Assign multiple members to projects
- View team member tasks
- Track daily progress
- Reward/warning system for performance

### Mobile Responsive
- Optimized layouts for mobile and tablet
- Touch-friendly drag-and-drop
- Responsive tables with horizontal scroll
- Sidebar closes on outside click
- Reduced spacing and font sizes for mobile

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Protected routes on frontend and backend
- Role-based access control
- Rate limiting (1000 requests per 15 minutes)
- Input validation and sanitization
- CORS configuration
- Secure token storage

## 🧪 Testing

### Manual Testing
1. Test user registration and login
2. Create a project and add team members
3. Create boards within projects
4. Create and assign tasks
5. Test Kanban drag-and-drop
6. Test search and filter functionality
7. Test mobile responsiveness
8. Test token refresh mechanism

### API Testing
- Import `backend/ProManager.postman_collection.json` into Postman
- Test all endpoints with sample data
- Verify authentication flows
- Check error handling

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Render/Heroku)
```bash
cd backend
# Follow platform-specific deployment guide
```

**Environment Variables for Production:**
- Set all .env variables in your hosting platform
- Update REACT_APP_API_URL to production backend URL
- Ensure MongoDB connection string is correct

## 📚 Additional Documentation

- [API Documentation](backend/API_DOCUMENTATION.md)
- [Architecture Overview](backend/ARCHITECTURE.md)


## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```bash
# Ensure MongoDB is running
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
```

**CORS Errors:**
- Verify REACT_APP_API_URL in frontend .env.local
- Check backend CORS configuration

**Token Expired:**
- Clear browser sessionStorage
- Login again

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Shreya Mahajan** - Initial work

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for robust database solution
- All open-source contributors


---

**Built with ❤️ using MERN Stack**
