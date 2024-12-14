# Full-Stack Application Documentation

## Table of Contents

1. [Frontend](#frontend)
   - [Installation](#installation)
   - [Scripts](#scripts)
   - [Dependencies](#dependencies)

2. [Backend](#backend)
   - [Installation](#installation-1)
   - [Scripts](#scripts-1)
   - [Dependencies](#dependencies-1)
   - [File Structure](#file-structure)
   - [Environment Variables](#environment-variables)

---

## Frontend

### Installation

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Lint the code using ESLint.

### Dependencies

| Dependency                | Version |
|---------------------------|---------|
| `@hookform/resolvers`     | 3.9.1   |
| `@radix-ui/react-avatar`  | 1.1.1   |
| `@radix-ui/react-checkbox`| 1.1.2   |
| `@radix-ui/react-dialog`  | 1.1.2   |
| `@radix-ui/react-dropdown-menu` | 2.1.2 |
| `axios`                   | 1.7.9   |
| `react`                   | 18.3.1  |
| `tailwindcss`             | 3.4.16  |
| `zod`                     | 3.24.0  |

> For the full list, refer to the `package.json` file.

---

## Backend

### Installation

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Scripts

- **`npm start`**: Start the development server using `nodemon`.

### Dependencies

| Dependency       | Version |
|------------------|---------|
| `express`        | 4.21.1  |
| `dotenv`         | 16.4.5  |
| `cors`           | 2.8.5   |
| `bcrypt`         | 5.1.1   |
| `jsonwebtoken`   | 9.0.2   |
| `pg`             | 8.13.1  |
| `prisma`         | 6.0.1   |

> For the full list, refer to the `package.json` file.

### File Structure

```
backend/
│
├── db/                     # Database connection
│   └── conn.js
│
├── lib/                    # Library utilities
│   └── socket.js
│
├── middleware/             # Middleware functions
│   └── authMiddleware.js
│
├── prisma/                 # Prisma schema
│   └── schema.prisma
│
├── routes/                 # API routes
│   ├── authRoutes.js       # Authentication routes
│   ├── userRoutes.js       # User-related routes
│   └── notificationRoutes.js
│
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── index.js                # Main entry point
├── package.json            # Backend dependencies
└── package-lock.json


```

### Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```
PORT=5000
FRONTED_URL=http://localhost:3000
DATABASE_URL=your-database-url-here
JWT_SECRET=your-jwt-secret
```

### Middleware

- **CORS**: Ensures cross-origin requests are allowed from the frontend.
- **Cookie Parser**: Parses cookies sent by the client.
- **Express JSON**: Parses JSON payloads.

### API Endpoints

#### Health Check
- **GET /**
  - Returns a simple "Hello World!" message.

#### Authentication Routes
- **Base URL**: `/api/auth`

#### User Routes
- **Base URL**: `/api/user`

#### Notification Routes
- **Base URL**: `/api/notification`

---

For more information, refer to the respective `routes` files in the `backend/routes` folder.

