# Alta Invoice Management System

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL

### Backend Setup
1. Install PostgreSQL
2. Create database:
   ```bash
   createdb alta_invoice_db
   ```

3. Copy `.env.example` to `.env` and update with your settings:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=alta_invoice_db
   DB_USER=postgres
   DB_PASSWORD=postgres123
   JWT_SECRET=your-super-secret-key-here
   PORT=3000
   ```

4. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

5. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Working with Prisma:
   ```bash
   npx prisma studio
   ```
   This will start Prisma Studio on http://localhost:5555

### Frontend Setup
1. Install frontend dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the backend server:
   ```bash
   cd backend
   npm run start:dev
   ```
   Backend will run at `http://localhost:3000`

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```
   Frontend will run at `http://localhost:5173`

### Demo Account
```
Email: demo@altametrics.com
Password: 1234
```

