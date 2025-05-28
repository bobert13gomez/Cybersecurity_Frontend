# Cybersecurity_Frontend
# Frontend Application

This React-based frontend application provides comprehensive user management, permission control, and activity logging features. It utilizes Redux Toolkit for state management, React Router for protected routing, and Axios interceptors for streamlined API communication.

---

## Table of Contents

- [Technologies](#technologies)  
- [Installation](#installation)  
- [Project Structure](#project-structure)  
- [API Services](#api-services)  
- [State Management](#state-management)  
- [Routing & Permissions](#routing--permissions)  
- [Activity Logging](#activity-logging)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Technologies

- React  
- Redux Toolkit  
- React Router DOM  
- Axios with interceptors  
- React Toastify  
- JavaScript (ES6+)  

---

Project Structure
src/
├── components/         
├── Interceptor/         
├── pages/             
├── redux/             
├── services/            
├── utils/             
├── App.js               
└── index.js 

API Services
API interactions are managed via dedicated service functions using an Axios interceptor instance for consistent authorization and error handling.

User Management
addUser(data) — Add a new user (POST /user)

getUser(page, limit) — Fetch users with pagination (GET /user?page=&limit=)

updatedUser(data, id) — Update user data (PUT /user?id=)

deleteUser(id, active) — Delete or deactivate user (DELETE /user?id=&active=)

allUserGet() — Retrieve all users (GET /user/get)

Permissions
permissionGet() — Fetch current user's individual permissions (GET /user/individualPermission)

Activity Logs
activityPost(data) — Log user activities with action and IP address (POST /user/activity)

activityGet(userId) — Get activity logs for a specific user (GET /user/activity?userId=)

State Management
The app uses Redux Toolkit to manage permissions state globally.

permissionSlice stores and updates permission data via the setpermission action.

Routing & Permissions
Routes are protected based on user permissions via the ProtectedRoute component.

Unauthorized users are redirected to an UnauthorizedPage.

Permissions checked: view, edit, delete, manage.
