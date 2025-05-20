A monolithic RESTful API built with NestJS and MongoDB for managing tasks, supporting CRUD operations with pagination and sorting.

## Setup Instructions

1.  **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd task-manager
    ```

    Replace `<repository-url>` with the GitHub or GitLab repository URL.

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Set Up MongoDB**:

    - Use MongoDB Atlas (cloud) or a local MongoDB instance.
    - Create a `.env` file in the project root:
      ```bash
      echo "MONGO_URI=mongodb://localhost:27017/taskmanager" > .env
      ```
    - For Atlas, replace with your connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taskmanager`).

4.  **Run the Application**:
    ```bash
    npm run start
    ```
    The API will be available at `http://localhost:3000`.

## API Endpoints

- **POST /tasks**: Create a new task.

  - Body: `{ 
         "title": "string", 
         "description": "string", 
         "status": "Pending|In Progress|Completed", 
         "dueDate": "YYYY-MM-DDTHH:mm:ssZ"
       }`

- **GET /tasks**: List all tasks with optional filters.

  - Query: `status` (e.g., `Pending`), `page` (default: 1), `limit` (default: 10), `sortBy` (`dueDate` or `createdAt`), `order` (`asc` or `desc`).

- **GET /tasks/:id**: Get a task by ID.
- **PATCH /tasks/:id**: Update a task (partial updates).

  - Body: Same as POST, all fields optional.

- **DELETE /tasks/:id**: Delete a task.

## Assumptions

- MongoDB is used as the database (local or Atlas).
- Node.js (v16+) and npm are installed.
- Environment variable `MONGO_URI` is set in `.env`.
- All tasks require a unique title and a future `dueDate`.
- Status is restricted to `Pending`, `In Progress`, or `Completed`.
- Pagination defaults: `page=1`, `limit=10`.
- Sorting defaults: `sortBy=createdAt`, `order=asc`.

## Testing

- Use Postman or curl to test endpoints.
- Example: Create a task:
  ```bash
  curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Task 1","description":"Test","status":"Pending","dueDate":"2025-05-21T00:00:00Z"}'
  ```
- Example: Get paginated tasks sorted by dueDate:
  ```bash
  curl http://localhost:3000/tasks?page=1&limit=2&sortBy=dueDate&order=asc
  ```

## Error Handling

- **400 Bad Request**: Invalid input (e.g., missing title, invalid status, or past dueDate).
- **404 Not Found**: Task ID doesn’t exist.
- **409 Conflict**: Duplicate task title.
