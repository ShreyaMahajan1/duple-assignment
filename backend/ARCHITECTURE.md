# ProManager - Architecture Documentation

## System Overview

ProManager is a full-stack project management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The system follows a three-tier architecture with clear separation of concerns.

---

## Architecture Layers

### 1. Presentation Layer (Frontend)
- **Technology**: React.js 18.2
- **State Management**: Context API (to be implemented) / Local State
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Framework**: Bootstrap 5, React-Bootstrap
- **Deployment**: Vercel

### 2. Application Layer (Backend)
- **Technology**: Node.js with Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Deployment**: Render

### 3. Data Layer
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Caching**: (Future implementation)

---

## Backend Architecture

### Folder Structure

```
backend/
├── index.js                    # Application entry point
├── .env                        # Environment variables
├── package.json
├── server/
│   ├── config/
│   │   ├── promanger(db).js   # Database connection
│   │   └── seed.js            # Database seeding
│   ├── middleware/
│   │   ├── tokenChecker.js    # JWT authentication
│   │   ├── errorHandler.js    # Centralized error handling
│   │   ├── validator.js       # Input validation & sanitization
│   │   └── rateLimiter.js     # Rate limiting
│   ├── apis/
│   │   ├── auth/              # Authentication logic
│   │   ├── user/              # User management
│   │   ├── employee/          # Employee management
│   │   ├── project/           # Project management
│   │   ├── board/             # Board management (NEW)
│   │   ├── task/              # Task management
│   │   ├── category/          # Category management
│   │   ├── subCategory/       # Subcategory management
│   │   ├── projectTeam/       # Team management
│   │   ├── chat/              # Messaging
│   │   ├── coins/             # Rewards system
│   │   ├── submit/            # Work submissions
│   │   └── dashboard/         # Dashboard analytics
│   ├── routes/
│   │   ├── adminRoutes.js     # Admin endpoints
│   │   ├── employeeRoutes.js  # Employee endpoints
│   │   └── authRoutes.js      # Auth endpoints (NEW)
│   └── public/                # Static files
│       ├── employee/          # Employee images
│       ├── project/           # Project attachments
│       ├── task/              # Task attachments
│       └── submit/            # Submission files
```

### Design Patterns

#### 1. MVC Pattern (Modified)
- **Models**: Mongoose schemas define data structure
- **Controllers**: Business logic and data manipulation
- **Routes**: API endpoint definitions

#### 2. Middleware Pattern
- Request processing pipeline
- Authentication, validation, error handling
- Separation of cross-cutting concerns

#### 3. Repository Pattern (Implicit)
- Mongoose models act as repositories
- Abstraction over data access

---

## Key Architectural Decisions

### 1. Authentication Strategy

**Decision**: JWT with Refresh Token mechanism

**Rationale**:
- Stateless authentication
- Scalable across multiple servers
- Refresh tokens for better security
- Access tokens expire quickly (1 hour)
- Refresh tokens stored in database for revocation

**Implementation**:
```
Access Token: 1 hour expiry
Refresh Token: 7 days expiry, stored in DB
Token Storage: Client-side (localStorage/sessionStorage)
```

### 2. API Design

**Decision**: RESTful API with POST-heavy approach

**Rationale**:
- Consistent with existing codebase
- POST allows complex query parameters in body
- Easy to extend with filters and pagination

**Endpoints Pattern**:
```
POST /admin/resource/add
POST /admin/resource/all
POST /admin/resource/single
POST /admin/resource/update
POST /admin/resource/delete
GET  /admin/resource/all (with query params for pagination)
```

### 3. Error Handling

**Decision**: Centralized error handling middleware

**Rationale**:
- Consistent error responses
- Easier debugging and logging
- Single point for error transformation

**Implementation**:
```javascript
app.use(errorHandler) // Last middleware
```

### 4. Data Hierarchy

**Decision**: Project → Board → Task structure

**Rationale**:
- Flexible organization (Kanban-style)
- Supports multiple workflows per project
- Clear separation of concerns

**Structure**:
```
Project (e.g., "Website Redesign")
  └── Board (e.g., "Sprint 1", "Backlog")
      └── Task (e.g., "Design Homepage")
```

### 5. Soft Deletes

**Decision**: Use status field instead of hard deletes

**Rationale**:
- Data recovery possible
- Audit trail maintained
- Referential integrity preserved

**Implementation**:
```javascript
status: Boolean // true = active, false = deleted
```

### 6. File Storage

**Decision**: Local file system storage

**Rationale**:
- Simple implementation
- No external dependencies
- Cost-effective for MVP

**Future Consideration**:
- Move to cloud storage (AWS S3, Cloudinary)
- Better scalability and CDN support

---

## Security Architecture

### 1. Authentication Flow

```
1. User Login
   ↓
2. Validate Credentials (bcrypt)
   ↓
3. Generate Access Token (1h) + Refresh Token (7d)
   ↓
4. Store Refresh Token in DB
   ↓
5. Return both tokens to client
   ↓
6. Client stores tokens
   ↓
7. Client uses Access Token for API calls
   ↓
8. When Access Token expires:
   - Client sends Refresh Token
   - Server validates and issues new Access Token
```

### 2. Authorization

**Role-Based Access Control (RBAC)**:
- Admin (userType: 1): Full access
- Employee (userType: 2): Limited access

**Route Protection**:
```javascript
// Public routes
POST /admin/login
POST /employee/login

// Protected routes (require token)
POST /admin/* (except login)
POST /employee/* (except login)
```

### 3. Input Validation & Sanitization

**Layers**:
1. Client-side validation (React forms)
2. Server-side validation (middleware)
3. Database validation (Mongoose schemas)

**Sanitization**:
- Remove HTML tags
- Trim whitespace
- Escape special characters

### 4. Rate Limiting

**Configuration**:
- 100 requests per 15 minutes per IP
- Prevents brute force attacks
- Protects against DoS

---

## Data Flow

### Task Creation Flow

```
Client (React)
  ↓ POST /admin/task/add
Middleware Pipeline
  ↓ Rate Limiter
  ↓ Input Sanitization
  ↓ JWT Verification
  ↓ File Upload (Multer)
Controller
  ↓ Validation
  ↓ Business Logic
  ↓ Activity History
Model (Mongoose)
  ↓ Save to MongoDB
Response
  ↓ Populated Data
Client
```

### Task Update with Activity History

```
1. Receive update request
2. Fetch existing task
3. Compare old vs new values
4. Track changes
5. Update task fields
6. Append to activityHistory array
7. Save task
8. Return updated task with history
```

---

## Scalability Considerations

### Current Limitations
1. **File Storage**: Local filesystem (not scalable)
2. **No Caching**: Every request hits database
3. **No Load Balancing**: Single server instance
4. **No Message Queue**: Synchronous processing

### Future Improvements

#### 1. Caching Strategy

**Redis Implementation**:
```javascript
// Cache frequently accessed data
- User sessions
- Project lists
- Task lists (by project/board)
- Dashboard statistics

// Cache Invalidation
- On create/update/delete operations
- TTL: 5-15 minutes depending on data type
```

**Benefits**:
- Reduced database load
- Faster response times
- Better user experience

#### 2. Background Jobs

**Use Cases**:
- Email notifications
- Report generation
- Data aggregation
- File processing

**Implementation Options**:
- Bull (Redis-based queue)
- Agenda (MongoDB-based)
- AWS SQS

**Example**:
```javascript
// Send email notification when task assigned
queue.add('send-email', {
  to: employee.email,
  subject: 'New Task Assigned',
  taskId: task._id
})
```

#### 3. Microservices (Future)

**Potential Services**:
- Auth Service
- Project Service
- Task Service
- Notification Service
- File Service

**Benefits**:
- Independent scaling
- Technology flexibility
- Fault isolation

#### 4. Database Optimization

**Strategies**:
- Indexing (already implemented)
- Query optimization
- Connection pooling
- Read replicas for analytics

---

## Monitoring & Logging

### Current State
- Console logging
- Basic error messages

### Recommended Improvements

#### 1. Logging Strategy

**Levels**:
- ERROR: Application errors
- WARN: Potential issues
- INFO: Important events
- DEBUG: Detailed information

**Tools**:
- Winston (logging library)
- Morgan (HTTP request logging)
- ELK Stack (Elasticsearch, Logstash, Kibana)

#### 2. Monitoring

**Metrics to Track**:
- API response times
- Error rates
- Database query performance
- Memory usage
- CPU usage

**Tools**:
- New Relic
- Datadog
- PM2 (process management)

#### 3. Alerting

**Alerts for**:
- Server downtime
- High error rates
- Slow response times
- Database connection issues

---

## Deployment Architecture

### Current Setup

**Frontend (Vercel)**:
```
GitHub → Vercel
- Automatic deployments on push
- CDN distribution
- HTTPS enabled
```

**Backend (Render)**:
```
GitHub → Render
- Automatic deployments on push
- Environment variables configured
- HTTPS enabled
```

**Database (MongoDB Atlas)**:
```
- Cloud-hosted
- Automatic backups
- Replica sets
```

### Production Best Practices

1. **Environment Separation**:
   - Development
   - Staging
   - Production

2. **CI/CD Pipeline**:
   - Automated testing
   - Code quality checks
   - Automated deployments

3. **Health Checks**:
   - `/health` endpoint
   - Database connectivity check
   - Service status monitoring

---

## API Versioning

### Current State
- No versioning (v1 implicit)

### Recommended Approach

**URL Versioning**:
```
/api/v1/admin/task/all
/api/v2/admin/task/all
```

**Benefits**:
- Backward compatibility
- Gradual migration
- Clear deprecation path

---

## Testing Strategy

### Recommended Approach

#### 1. Unit Tests
- Test individual functions
- Mock dependencies
- Tools: Jest, Mocha

#### 2. Integration Tests
- Test API endpoints
- Test database operations
- Tools: Supertest, Jest

#### 3. End-to-End Tests
- Test complete user flows
- Tools: Cypress, Playwright

---

## Performance Optimization

### Backend Optimizations

1. **Database Queries**:
   - Use indexes
   - Limit fields returned
   - Pagination
   - Avoid N+1 queries

2. **Response Compression**:
   ```javascript
   app.use(compression())
   ```

3. **Connection Pooling**:
   ```javascript
   mongoose.connect(uri, {
     maxPoolSize: 10
   })
   ```

### Frontend Optimizations

1. **Code Splitting**:
   - Lazy loading routes
   - Dynamic imports

2. **Caching**:
   - Service workers
   - Browser caching

3. **Bundle Optimization**:
   - Tree shaking
   - Minification
   - Compression

---

## Conclusion

This architecture provides a solid foundation for a scalable project management system. The modular design allows for easy extension and maintenance. Future improvements should focus on caching, background jobs, and enhanced monitoring to support growth and improve user experience.
