# Express Backend

A RESTful API backend built with Express.js, Prisma ORM, and PostgreSQL featuring user authentication.

## Features

- User authentication (signup, login, logout) with JWT
- Password hashing with bcrypt
- Health check endpoint
- PostgreSQL database with Prisma ORM
- Graceful shutdown handling

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 5
- **Database:** PostgreSQL
- **ORM:** Prisma 7
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment:** dotenv

## Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── src/
│   ├── server.js          # Application entry point
│   ├── config/
│   │   └── db.js          # Database connection
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── utils/
│       └── generateToken.js
├── package.json
└── prisma.config.ts
```

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd express-js
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file** (see Environment Variables section)

5. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

6. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-jwt-secret-key"
```

## Database Schema

### Models

- **User** - User accounts with authentication (id, name, email, password, createdAt)

## API Endpoints

### Health Check

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| GET    | `/health` | Check server status |

### Authentication

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | `/auth/signup` | Register a new user |
| POST   | `/auth/login`  | Login user          |
| POST   | `/auth/logout` | Logout user         |

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start development server |
| `npm test`    | Run tests                |

## Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

## Development

The server runs on port `5001` by default.

```bash
npm run dev
```

Server URL: `http://localhost:5001`

## License

ISC

## Author

Farhan
