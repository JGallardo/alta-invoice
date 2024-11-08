# Alta Invoice Management System

## Setup

### Prerequisites
- Node.js
- Docker Desktop

### Database Setup
1. Start PostgreSQL:
```bash
docker-compose up -d
```

2. Reset and seed database:
```bash
cd backend
npx prisma migrate reset
```
Type 'y' when prompted.

### Running the App

1. Start backend:
```bash
cd backend
npm run start:dev
```

2. In a new terminal, start frontend:
```bash
npm run dev
```

### Login Credentials
```
Email: demo@altametrics.com
Password: 1234
```

### API Endpoints
- POST /auth/login - Login
- GET /invoices - List all invoices
- GET /invoices/:id - Get invoice details
- GET /invoices/total - Get invoice totals