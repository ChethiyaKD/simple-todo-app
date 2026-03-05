# Server - Simple Todo App

This is the Express backend for the Simple Todo App. It uses MongoDB for data storage and implements JWT-based authentication to secure the API.

## Features

- **Store Tasks**: Persist tasks securely in a MongoDB database.
- **Authentication**: JWT and cookie-based authentication to ensure users only access their own tasks (or as authenticated).
- **CRUD Operations**: Comprehensive endpoints to Create, Read, Update, Complete, and Delete tasks.

## Environment Variables

To run this backend, you will need to add the following environment variables to your `.env` file in the `server` directory:

```env
PORT=5000            # Port the server runs on
MONGO_URI=""         # MongoDB connection string
JWT_SECRET=""        # Secret key for JWT signing
```

## API Endpoints

### Authentication

- `GET /api/auth`
  - Generates and returns an authentication token (JWT) inside an HTTP-only cookie, and also returns it in the response payload.

### Todos

_All endpoints under `/api/todos` require the `authUser` middleware (user must have a valid JWT token)._

- `GET /api/todos`
  - Get all todos for the authenticated user.
- `POST /api/todos`
  - Create a new todo item.
- `PUT /api/todos/:id`
  - Update an existing todo (e.g., modifying the title or description).
- `PATCH /api/todos/:id/done`
  - Toggle the completion status of a specific todo.
- `DELETE /api/todos/:id`
  - Delete a specific todo structure.

## Running Locally

1. Install dependencies:
   ```bash
   yarn install
   ```
2. Start the development server:
   ```bash
   yarn dev
   ```
