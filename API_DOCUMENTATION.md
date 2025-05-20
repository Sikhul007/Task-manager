Task Manager API Documentation
This document describes the RESTful API for the Task Manager, built with NestJS and MongoDB. All endpoints are prefixed with /tasks.
Base URL
http://localhost:3000 (or your deployed URL)
Endpoints

1. Create a Task

Method: POST
Path: /tasks
Body:{
"title": "string (required, unique)",
"description": "string (optional)",
"status": "Pending | In Progress | Completed (optional, default: Pending)",
"dueDate": "YYYY-MM-DDTHH:mm:ssZ (required, must be future date)"
}

Response:
201 Created: Returns the created task.{
"\_id": "string",
"title": "Task 1",
"description": "Test",
"status": "Pending",
"dueDate": "2025-05-21T00:00:00Z",
"createdAt": "2025-05-20T15:00:00Z",
"updatedAt": "2025-05-20T15:00:00Z"
}

400 Bad Request: Invalid input (e.g., missing title, invalid status, past dueDate).
409 Conflict: Task with the same title exists.

2. Get All Tasks

Method: GET
Path: /tasks
Query Parameters:
status (optional): Filter by status (Pending, In Progress, Completed).
page (optional, default: 1): Page number for pagination.
limit (optional, default: 10): Number of tasks per page.
sortBy (optional, default: createdAt): Sort by dueDate or createdAt.
order (optional, default: asc): Sort order (asc or desc).

Example: /tasks?status=Pending&page=1&limit=2&sortBy=dueDate&order=asc
Response:
200 OK: Returns a paginated list of tasks with metadata.{
"tasks": [
{
"_id": "string",
"title": "Task 6",
"description": "6th task",
"status": "In Progress",
"dueDate": "2025-05-21T00:00:00Z",
"createdAt": "2025-05-20T15:00:00Z",
"updatedAt": "2025-05-20T15:00:00Z"
},
...
],
"total": 7,
"pages": 1
}

400 Bad Request: Invalid query parameters.

3. Get a Task by ID

Method: GET
Path: /tasks/:id
Response:
200 OK: Returns the task.{
"\_id": "string",
"title": "Task 4",
"description": "4th task",
"status": "In Progress",
"dueDate": "2025-05-21T00:00:00Z",
"createdAt": "2025-05-20T15:00:00Z",
"updatedAt": "2025-05-20T15:00:00Z"
}

404 Not Found: Task ID doesn’t exist.

4. Update a Task

Method: PATCH
Path: /tasks/:id
Body: Same as POST, all fields optional.{
"status": "Completed",
"description": "Updated description"
}

Response:
200 OK: Returns the updated task.
400 Bad Request: Invalid input.
404 Not Found: Task ID doesn’t exist.
409 Conflict: Updated title already exists.

5. Delete a Task

Method: DELETE
Path: /tasks/:id
Response:
200 OK: Empty response ({}).
404 Not Found: Task ID doesn’t exist.

Error Handling

400 Bad Request: Invalid request body or query parameters (e.g., invalid status or dueDate).
404 Not Found: Task not found for GET, PATCH, or DELETE.
409 Conflict: Duplicate title during creation or update.
500 Internal Server Error: Unexpected server issues (e.g., database connection failure).

Testing

Use Postman or curl to test endpoints.
Example: Create a task:curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Task 1","description":"Test","status":"Pending","dueDate":"2025-05-21T00:00:00Z"}'

Example: Get paginated and sorted tasks:curl http://localhost:3000/tasks?page=1&limit=2&sortBy=dueDate&order=asc

Notes

Ensure MONGO_URI is set in .env for MongoDB connection.
All tasks require a unique title and a future dueDate.
Status must be one of Pending, In Progress, or Completed.
