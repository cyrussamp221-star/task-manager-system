# Task Manager Application - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Installation & Setup](#installation--setup)
5. [API Documentation](#api-documentation)
6. [Frontend Guide](#frontend-guide)
7. [Database Schema](#database-schema)
8. [Configuration](#configuration)
9. [Troubleshooting](#troubleshooting)
10. [Development Notes](#development-notes)

---

## 🎯 Project Overview

**Task Manager** is a full-stack web application that allows users to create, manage, and track tasks with advanced features like categories, priority levels, timers, and statistics.

- **Frontend**: Modern HTML5/CSS3/JavaScript with glassmorphism UI
- **Backend**: Express.js REST API
- **Database**: SQL.js (In-memory with persistence)
- **Architecture**: Microservice-style with modular route handlers
- **Deployment**: Cloud-ready (Render.com compatible)

### Tech Stack
- **Runtime**: Node.js
- **Server Framework**: Express.js 4.18.2
- **Database**: sql.js 1.14.1
- **Middleware**: CORS, body-parser, dotenv
- **Frontend**: Vanilla JavaScript, Modern CSS3, HTML5

---

## ✨ Features

### Core Features
✅ **Task Management**
- Create, read, update, delete tasks
- Mark tasks as complete/incomplete
- Edit existing tasks

✅ **Categorization**
- Organize tasks by custom categories
- Create multiple categories
- Filter tasks by category

✅ **Priority System**
- High, Medium, Low priority levels
- Priority-based color coding (Red, Amber, Green)
- Visual indicators for task urgency

✅ **Task Timer**
- Set estimated time for tasks
- Start/pause timer for tracking
- Real-time countdown display
- Automatic sync to backend

✅ **Statistics Dashboard**
- Total task count
- Completed vs. pending tasks
- Completion rate percentage
- Real-time statistics updates

✅ **Search & Filter**
- Search tasks by name
- Filter by category
- Combined search and filter capabilities

✅ **Modern UI/UX**
- Glassmorphism design with backdrop blur
- Red and black color scheme
- Smooth animations and transitions
- Responsive mobile design
- Dark theme with gradient accents

---

## 🏗️ System Architecture

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Client)                    │
│  HTML5 / CSS3 / Vanilla JavaScript                      │
│  - Task Form                                            │
│  - Statistics Dashboard                                 │
│  - Task List View                                       │
│  - Search & Filter                                      │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP/REST API
                        ▼
┌─────────────────────────────────────────────────────────┐
│                Express.js API Server                     │
│  - Request Logger Middleware                            │
│  - Error Handler Middleware                             │
│  - Validation Middleware                                │
├─────────────────────────────────────────────────────────┤
│  Routes:                                                │
│  ├── /api/tasks (GET, POST, PUT, PATCH, DELETE)        │
│  ├── /api/categories (GET, POST)                        │
│  └── /api/stats (GET)                                   │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   Database (sql.js)                     │
│  Tables:                                                │
│  ├── tasks                                              │
│  ├── categories                                         │
│  └── task_statistics (derived)                          │
└─────────────────────────────────────────────────────────┘
```

### File Structure
```
SIA-FINALS-PEÑFLOR/
├── server.js                 # Express server entry point
├── db.js                      # Database initialization
├── tasl-service.js           # Task service layer
├── package.json              # Dependencies
├── .env                       # Environment variables
│
├── config/
│   └── database.js           # Database configuration
│
├── middleware/
│   ├── errorHandler.js       # Global error handling
│   ├── requestLogger.js      # Request logging
│   └── validation.js         # Input validation
│
├── routes/
│   ├── tasks.js              # Task endpoints
│   ├── categories.js         # Category endpoints
│   └── stats.js              # Statistics endpoints
│
└── public/
    ├── app.html              # Frontend application
    └── TaskManager_API_Collection.postman_collection.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git
- Modern web browser

### Step 1: Clone/Download Project
```bash
cd SIA-FINALS-PEÑFLOR
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
```

### Step 4: Start Development Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Step 5: Access Application
Open your browser and navigate to:
```
http://localhost:5000
```

The frontend will load automatically, or you can open:
```
http://localhost:5000/public/app.html
```

---

## 📡 API Documentation

### Base URL
```
https://sia-finals-main-2.onrender.com/api
(or http://localhost:5000/api for local development)
```

### Health Check
**Endpoint**: `GET /api/health`

**Response**:
```json
{
    "status": "OK",
    "message": "Task Manager API is running",
    "timestamp": "2026-05-27T10:30:00.000Z"
}
```

---

### Tasks Endpoints

#### 1. Get All Tasks
**Request**:
```
GET /api/tasks
```

**Response** (200 OK):
```json
{
    "success": true,
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "text": "Complete project documentation",
            "category_id": "cat-001",
            "priority": "High",
            "completed": false,
            "original_time": 3600,
            "remaining_time": 2400,
            "created_at": "2026-05-27T08:00:00.000Z",
            "updated_at": "2026-05-27T08:00:00.000Z"
        }
    ]
}
```

#### 2. Create Task
**Request**:
```
POST /api/tasks
Content-Type: application/json

{
    "text": "Complete project documentation",
    "category_id": "cat-001",
    "priority": "High",
    "original_time": 3600,
    "remaining_time": 3600
}
```

**Response** (201 Created):
```json
{
    "success": true,
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "text": "Complete project documentation",
        "category_id": "cat-001",
        "priority": "High",
        "completed": false,
        "original_time": 3600,
        "remaining_time": 3600,
        "created_at": "2026-05-27T08:00:00.000Z",
        "updated_at": "2026-05-27T08:00:00.000Z"
    }
}
```

#### 3. Update Task
**Request**:
```
PUT /api/tasks/{taskId}
Content-Type: application/json

{
    "text": "Updated task description",
    "category_id": "cat-002",
    "priority": "Medium",
    "original_time": 1800,
    "remaining_time": 1800
}
```

**Response** (200 OK):
```json
{
    "success": true,
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "text": "Updated task description",
        "category_id": "cat-002",
        "priority": "Medium",
        "completed": false,
        "original_time": 1800,
        "remaining_time": 1800,
        "updated_at": "2026-05-27T10:30:00.000Z"
    }
}
```

#### 4. Toggle Task Completion
**Request**:
```
PATCH /api/tasks/{taskId}/toggle
```

**Response** (200 OK):
```json
{
    "success": true,
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "completed": true,
        "updated_at": "2026-05-27T10:30:00.000Z"
    }
}
```

#### 5. Update Task Timer
**Request**:
```
PATCH /api/tasks/{taskId}/timer
Content-Type: application/json

{
    "remaining_time": 1200
}
```

**Response** (200 OK):
```json
{
    "success": true,
    "data": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "remaining_time": 1200,
        "updated_at": "2026-05-27T10:30:00.000Z"
    }
}
```

#### 6. Delete Task
**Request**:
```
DELETE /api/tasks/{taskId}
```

**Response** (200 OK):
```json
{
    "success": true,
    "message": "Task deleted successfully"
}
```

---

### Categories Endpoints

#### 1. Get All Categories
**Request**:
```
GET /api/categories
```

**Response** (200 OK):
```json
{
    "success": true,
    "data": [
        {
            "id": "cat-001",
            "name": "Work",
            "created_at": "2026-05-27T08:00:00.000Z"
        },
        {
            "id": "cat-002",
            "name": "Personal",
            "created_at": "2026-05-27T08:00:00.000Z"
        }
    ]
}
```

#### 2. Create Category
**Request**:
```
POST /api/categories
Content-Type: application/json

{
    "name": "Shopping"
}
```

**Response** (201 Created):
```json
{
    "success": true,
    "data": {
        "id": "cat-003",
        "name": "Shopping",
        "created_at": "2026-05-27T10:30:00.000Z"
    }
}
```

---

### Statistics Endpoints

#### Get Statistics
**Request**:
```
GET /api/stats
```

**Response** (200 OK):
```json
{
    "success": true,
    "data": {
        "total_tasks": 10,
        "completed_tasks": 6,
        "pending_tasks": 4,
        "completion_rate": 60,
        "tasks_by_priority": {
            "High": 3,
            "Medium": 5,
            "Low": 2
        },
        "tasks_by_category": {
            "Work": 5,
            "Personal": 3,
            "Shopping": 2
        }
    }
}
```

---

## 🎨 Frontend Guide

### User Interface Components

#### 1. Header Section
- Display: Task Manager title with gradient effect
- Subtitle: Connection status indicator

#### 2. Statistics Dashboard
- **Total Tasks**: Count of all created tasks
- **Completed**: Count of finished tasks
- **Pending**: Count of outstanding tasks
- **Completion Rate**: Percentage of completed tasks

#### 3. Create New Task Form
- **Task Description**: Text input for task name
- **Category**: Dropdown selector
- **Priority**: High/Medium/Low dropdown
- **Time Estimate**: Optional time in minutes
- **Submit Button**: "Add Task" or "Save Task" (edit mode)

#### 4. Filter & Search Section
- **Filter by Category**: Dropdown to filter tasks
- **Search**: Text input to search task names

#### 5. Task List
Each task displays:
- Task title
- Priority badge (color-coded)
- Category badge
- Estimated time (if set)
- Remaining time (if timer active)
- Action buttons:
  - **Start/Pause Timer**: Control countdown
  - **Edit**: Modify task details
  - **Complete/Undo**: Mark completion status
  - **Delete**: Remove task

### Color Scheme
- **High Priority**: Red (#ef4444)
- **Medium Priority**: Amber (#f59e0b)
- **Low Priority**: Green (#10b981)
- **Primary Action**: Red gradient
- **Background**: Dark navy with transparency
- **Borders**: Red with opacity

### Keyboard Shortcuts
- `Enter` in search field: Filter tasks
- `Escape` in edit mode: Cancel edit

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🗄️ Database Schema

### Tables Structure

#### tasks Table
```sql
CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    category_id TEXT NOT NULL,
    priority TEXT CHECK(priority IN ('High', 'Medium', 'Low')),
    completed BOOLEAN DEFAULT 0,
    original_time INTEGER DEFAULT 0,
    remaining_time INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

#### categories Table
```sql
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Data Types
- **id**: UUID v4 string
- **text**: Text (max 500 characters)
- **category_id**: UUID reference to categories
- **priority**: ENUM (High, Medium, Low)
- **completed**: BOOLEAN (0/1)
- **time fields**: INTEGER (seconds)
- **timestamps**: ISO 8601 format

---

## ⚙️ Configuration

### Environment Variables
Create `.env` file in root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_PATH=./data/tasks.db

# API Configuration
API_BASE_URL=http://localhost:5000/api
CORS_ORIGIN=*

# Logging
LOG_LEVEL=info
```

### Default Categories
The application automatically creates these default categories:
- General
- Work
- Personal

### API Response Format
All API responses follow this format:
```json
{
    "success": boolean,
    "data": object | array,
    "message": string (on error),
    "timestamp": ISO 8601 string
}
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. API Connection Failed
**Problem**: "Failed to load tasks" error

**Solutions**:
- Ensure backend server is running (`npm run dev`)
- Check if port 5000 is available
- Verify firewall settings
- Check browser console for CORS errors
- Ensure API_BASE_URL is correct in app.html

#### 2. Categories Not Loading
**Problem**: "Loading categories..." stuck in dropdown

**Solutions**:
```javascript
// Clear browser cache (Ctrl+Shift+Delete)
// Refresh page (F5)
// Check Network tab in Developer Tools
// Verify POST to /api/categories succeeds
```

#### 3. Tasks Not Persisting
**Problem**: Tasks disappear after page refresh

**Solutions**:
- Check if database file has write permissions
- Verify DATABASE_PATH in .env
- Check server logs for database errors
- Ensure sufficient disk space

#### 4. Timer Not Working
**Problem**: Timer doesn't count down

**Solutions**:
- Ensure task has remaining_time > 0
- Task cannot have timer if completed
- Check browser console for JavaScript errors
- Refresh page and try again

#### 5. UI Not Displaying Correctly
**Problem**: Styles not loading, black background missing

**Solutions**:
- Clear browser cache
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check CSS file is loaded (DevTools > Network)
- Verify app.html path is correct

### Debug Mode

Enable debug logging in browser console:
```javascript
// In browser DevTools
localStorage.setItem('debug', 'true');

// Add to app.html script before initialize()
if (localStorage.getItem('debug') === 'true') {
    console.log = (msg) => {
        console.original(new Date().toISOString(), msg);
    };
}
```

### Log Files
Check server logs for errors:
```bash
# View live logs
npm run dev

# Check for errors in middleware
# middleware/errorHandler.js logs all errors
```

---

## 👨‍💻 Development Notes

### Adding New Features

#### 1. Add New Route
Create new file in `routes/` folder:
```javascript
// routes/newFeature.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Handle request
});

module.exports = router;
```

Register in server.js:
```javascript
const newFeatureRoutes = require('./routes/newFeature');
app.use('/api/newFeature', newFeatureRoutes);
```

#### 2. Extend Database
Edit `db.js` to add new table:
```javascript
const createTableSQL = `
    CREATE TABLE new_table (
        id TEXT PRIMARY KEY,
        ...
    )
`;
```

#### 3. Update Frontend
Edit `app.html` JavaScript section to call new endpoints.

### Testing

#### Using Postman
1. Import `TaskManager_API_Collection.postman_collection.json`
2. Update API_BASE_URL variable
3. Run test collection

#### Unit Tests
```bash
npm test
```

### Performance Optimization

1. **Database Indexing**
   - Add indexes on frequently queried columns
   - Example: `CREATE INDEX idx_category ON tasks(category_id)`

2. **Frontend Optimization**
   - Minimize re-renders
   - Use event delegation
   - Lazy load resources

3. **API Optimization**
   - Implement pagination for large datasets
   - Add caching headers
   - Use compression middleware

### Security Best Practices

1. **Input Validation**
   - All inputs validated in `middleware/validation.js`
   - Use parameterized queries (sql.js handles this)
   - Sanitize user input

2. **Error Handling**
   - Never expose stack traces to client
   - Use generic error messages
   - Log sensitive errors server-side only

3. **CORS Configuration**
   - Restrict origins in production
   - Update CORS_ORIGIN in .env

4. **Environment Variables**
   - Never commit `.env` file
   - Use `.env.example` for template

---

## 📝 API Examples

### Complete Task Workflow

1. **Create Category**
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Work"}'
```

2. **Create Task**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Complete documentation",
    "category_id": "cat-001",
    "priority": "High",
    "original_time": 3600
  }'
```

3. **Get All Tasks**
```bash
curl http://localhost:5000/api/tasks
```

4. **Toggle Task Complete**
```bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID/toggle
```

5. **Get Statistics**
```bash
curl http://localhost:5000/api/stats
```

---

## 📞 Support & Contact

For issues or feature requests:
1. Check Troubleshooting section
2. Review API Documentation
3. Check browser DevTools console
4. Review server logs

---

## 📄 License

ISC License - See package.json for details

---

## 🎉 Conclusion

The Task Manager application provides a complete solution for task management with a modern interface and robust backend API. Follow this documentation for setup, usage, and development guidelines.

**Last Updated**: May 27, 2026  
**Version**: 1.0.0
