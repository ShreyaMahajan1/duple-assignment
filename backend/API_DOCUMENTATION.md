# ProManager API Documentation

## Base URL
- Development: `http://localhost:5000`
- Production: `https://cypher-task-innovate-2.onrender.com`

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Structure
All API responses follow this structure:
```json
{
  "success": true/false,
  "status": 200,
  "message": "Response message",
  "data": {} // Response data
}
```

---

## Authentication Endpoints

### 1. Login (Admin/Employee)
**POST** `/admin/login` or `/employee/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "LoggedIn Successfully",
  "data": { /* user data */ },
  "token": "access_token",
  "refreshToken": "refresh_token"
}
```

### 2. Refresh Token
**POST** `/auth/refresh`

**Body:**
```json
{
  "refreshToken": "your_refresh_token"
}
```

### 3. Logout
**POST** `/auth/logout`

**Body:**
```json
{
  "refreshToken": "your_refresh_token"
}
```

---

## Project Management

### 1. Create Project
**POST** `/admin/project/add` 🔒

**Body (multipart/form-data):**
- name: string (required)
- description: string (required)
- client: string (required)
- technology: string (required)
- attachment: file (required)
- createdBy: ObjectId
- members: Array of ObjectIds

### 2. Get All Projects
**POST** `/admin/project/all` 🔒

**Body:**
```json
{
  "status": true
}
```

### 3. Get Single Project
**POST** `/admin/project/single` 🔒

**Body:**
```json
{
  "_id": "project_id"
}
```

### 4. Update Project
**POST** `/admin/project/update` 🔒

**Body (multipart/form-data):**
- _id: string (required)
- name: string
- description: string
- client: string
- technology: string
- attachment: file
- members: Array of ObjectIds

### 5. Delete Project
**POST** `/admin/project/delete` 🔒

**Body:**
```json
{
  "_id": "project_id"
}
```

---

## Board Management

### 1. Create Board
**POST** `/admin/board/add` 🔒

**Body:**
```json
{
  "name": "Board Name",
  "description": "Board Description",
  "projectId": "project_id",
  "createdBy": "user_id"
}
```

### 2. Get All Boards
**POST** `/admin/board/all` 🔒

**Query Parameters:**
- projectId: Filter by project

### 3. Get Single Board
**POST** `/admin/board/single` 🔒

**Body:**
```json
{
  "_id": "board_id"
}
```

### 4. Update Board
**POST** `/admin/board/update` 🔒

**Body:**
```json
{
  "_id": "board_id",
  "name": "Updated Name",
  "description": "Updated Description"
}
```

### 5. Delete Board
**POST** `/admin/board/delete` 🔒

**Body:**
```json
{
  "_id": "board_id"
}
```

---

## Task Management

### 1. Create Task
**POST** `/admin/task/add` 🔒

**Body (multipart/form-data):**
- title: string (required)
- description: string (required)
- employeeId: ObjectId (required)
- deadline: Date (required)
- projectId: ObjectId
- boardId: ObjectId
- subcategoryId: ObjectId
- priority: enum ['Low', 'Medium', 'High', 'Urgent']
- attachment: file

### 2. Get All Tasks (Enhanced with Pagination & Filters)
**GET** `/admin/task/all` 🔒

**Query Parameters:**
- page: number (default: 1)
- limit: number (default: 10)
- projectId: Filter by project
- boardId: Filter by board
- employeeId: Filter by assigned employee
- progress: Filter by status ['Todo', 'In Progress', 'Done', 'Pending']
- priority: Filter by priority ['Low', 'Medium', 'High', 'Urgent']
- search: Text search in title and description
- dueDateFrom: Filter tasks from this date
- dueDateTo: Filter tasks until this date

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "All tasks are loaded",
  "data": [ /* tasks array */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### 3. Get Single Task
**POST** `/admin/task/single` 🔒

**Body:**
```json
{
  "_id": "task_id"
}
```

### 4. Update Task
**POST** `/admin/task/update` 🔒

**Body (multipart/form-data):**
- _id: string (required)
- title: string
- description: string
- employeeId: ObjectId
- deadline: Date
- projectId: ObjectId
- boardId: ObjectId
- priority: enum
- progress: enum
- attachment: file

### 5. Update Task Progress
**POST** `/employee/task/progress` 🔒

**Body:**
```json
{
  "_id": "task_id",
  "progress": "In Progress" // Todo, In Progress, Done, Pending
}
```

### 6. Add Comment to Task
**POST** `/admin/task/comment` 🔒

**Body:**
```json
{
  "taskId": "task_id",
  "comment": "Your comment here",
  "userId": "user_id"
}
```

### 7. Delete Task
**POST** `/admin/task/delete` 🔒

**Body:**
```json
{
  "_id": "task_id"
}
```

---

## Employee Management

### 1. Register Employee
**POST** `/admin/employee/register` 🔒

**Body (multipart/form-data):**
- name: string (required)
- email: string (required)
- password: string (required)
- contact: string (required)
- experience: string (required)
- jobtitle: string (required)
- joiningdate: Date (required)
- picture: file (required)

### 2. Get All Employees
**POST** `/admin/employee/all` 🔒

### 3. Get Single Employee
**POST** `/admin/employee/single` 🔒

**Body:**
```json
{
  "_id": "employee_id"
}
```

### 4. Update Employee
**POST** `/admin/employee/update` 🔒

**Body (multipart/form-data):**
- _id: string (required)
- name: string
- contact: string
- experience: string
- jobtitle: string
- picture: file

### 5. Delete Employee
**POST** `/admin/employee/status` 🔒

**Body:**
```json
{
  "_id": "employee_id"
}
```

---

## Category & Subcategory

### Categories

**POST** `/admin/category/add` 🔒
**POST** `/admin/category/all` 🔒
**POST** `/admin/category/single` 🔒
**POST** `/admin/category/update` 🔒
**POST** `/admin/category/delete` 🔒

### Subcategories

**POST** `/admin/subcategory/add` 🔒
**POST** `/admin/subcategory/all` 🔒
**POST** `/admin/subcategory/single` 🔒
**POST** `/admin/subcategory/update` 🔒
**POST** `/admin/subcategory/delete` 🔒

---

## Project Team

**POST** `/admin/projectteam/add` 🔒
**POST** `/admin/projectteam/all` 🔒
**POST** `/admin/projectteam/single` 🔒
**POST** `/admin/projectteam/update` 🔒
**POST** `/admin/projectteam/delete` 🔒

---

## Chat/Messaging

### 1. Add Message
**POST** `/admin/chat/add` 🔒

**Body:**
```json
{
  "firstUserId": "user_id_1",
  "secondUserId": "user_id_2",
  "message": "Hello",
  "fromId": "user_id_1"
}
```

### 2. Get All Chats
**POST** `/admin/chat/all` 🔒

**Body:**
```json
{
  "userId": "user_id"
}
```

### 3. Get Single Chat
**POST** `/admin/chat/single` 🔒

**Body:**
```json
{
  "fromId": "user_id_1",
  "toId": "user_id_2"
}
```

### 4. Delete Message
**POST** `/admin/chat/delete` 🔒

**Body:**
```json
{
  "_id": "chat_id",
  "index": 0
}
```

---

## Dashboard

### Admin Dashboard
**POST** `/admin/dashboard` 🔒

### Employee Dashboard
**POST** `/employee/dashboard` 🔒

---

## Work Submission

### 1. Submit Work
**POST** `/employee/work/submit` 🔒

**Body (multipart/form-data):**
- taskId: ObjectId
- file: file
- description: string

### 2. Update Work
**POST** `/employee/work/update` 🔒

### 3. Get All Work
**POST** `/admin/work/all` 🔒

### 4. Get Single Work
**POST** `/admin/work/single` 🔒

**Body:**
```json
{
  "_id": "work_id"
}
```

---

## Coins/Rewards

**POST** `/admin/coin/add` 🔒
**POST** `/employee/coins/all` 🔒

---

## Error Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request / Validation Error
- **401**: Unauthorized / Token Expired
- **403**: Forbidden / Invalid Token
- **404**: Not Found
- **429**: Too Many Requests (Rate Limited)
- **500**: Internal Server Error

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Response when exceeded**: 429 Too Many Requests

---

## Notes

🔒 = Protected route (requires authentication token)

All dates should be in ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`

File uploads use `multipart/form-data` encoding.
