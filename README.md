# TeamFlow

TeamFlow is a browser-based team management system for managing users and tasks. It includes a login page, dashboard, user management, and task management.

## Project Structure

```text
TeamFlow/
├── index.html          Login page
├── Assests/            Images and icons
├── CSS/                Page stylesheets
├── JS/                 Frontend JavaScript
└── Pages/              Dashboard, users, and task pages
```

## Requirements

- A modern web browser
- A local web server for the frontend
- The TeamFlow backend/API running at `http://localhost:5678`
- The backend workflows and database configured for the API routes used by this project

The frontend calls these backend routes:

- `POST /webhook/login`
- `GET /webhook/users`
- `GET /webhook/tasks`
- `POST /webhook/create-task`
- `POST /webhook/update-task`
- `DELETE /webhook/delete-task`
- `POST /webhook/create user`
- `POST /webhook/update-user`
- `POST /webhook/delete-user`

The backend appears to be designed for n8n webhooks. Make sure the relevant workflows are running and active before testing the application.

## Running the Frontend

1. Open a PowerShell terminal in the project folder:

   ```powershell
   cd "C:\Users\Computer\OneDrive\Desktop\TeamFlow"
   ```

2. Start a local web server:

   ```powershell
   py -m http.server 5500
   ```

   If `py` is unavailable, try:

   ```powershell
   python -m http.server 5500
   ```

3. Open the application at:

   ```text
   http://localhost:5500/index.html
   ```

You can also use the VS Code Live Server extension by right-clicking `index.html` and selecting **Open with Live Server**.

Always begin at `index.html`, then log in before opening pages inside `Pages/`.

## Login Credentials

No default email address or password is stored in this frontend project. Login credentials are validated by the backend at:

```text
http://localhost:5678/webhook/login
```

Use an account that already exists in the backend database. If no account exists, create one through the backend/database setup. After logging in as an administrator, you can create additional users from the **Users** page.

Do not commit real passwords or API secrets to this repository.

## Troubleshooting

### Unable to connect to server

Make sure the backend is running on port `5678` and that the login webhook is active.

### Dashboard or tasks do not load

The dashboard and task pages request users and tasks from the backend. Check that these routes are available:

```text
http://localhost:5678/webhook/users
http://localhost:5678/webhook/tasks
```

### CORS errors

If the browser console reports a CORS error, configure the backend to allow requests from the frontend origin, such as `http://localhost:5500` or `http://127.0.0.1:5500`.

### Login redirects back to the login page

The frontend stores the successful login response in browser `localStorage`. Clear stale data and try again from the login page:

```javascript
localStorage.removeItem("user")
```

## Notes

This repository currently contains the frontend only. There is no `package.json`, npm build process, or frontend dependency installation required.
