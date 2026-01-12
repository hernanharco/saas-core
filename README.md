# SaaS Core - Multi-tenant Platform

Miniproyecto 1: Core & Onboarding for a SaaS Multi-tenant platform built with Spring Boot, React, TypeScript, and Neon PostgreSQL.

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Java 17+
- **Database**: Neon (PostgreSQL) with multi-tenant architecture
- **Security**: JWT authentication with tenant_id claims
- **ORM**: Spring Data JPA with Hibernate

### Frontend (React + Vite + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm (fast, disk space efficient)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with validation
- **HTTP Client**: Axios with interceptors
- **UI**: Tailwind CSS (ready to implement)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: Neon PostgreSQL (cloud-based)
- **Environment**: .env configuration

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Neon PostgreSQL account
- Node.js 18+ and pnpm (for local development)

### Install pnpm (if not installed)
```bash
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh
```

### 1. Environment Configuration

Copy and configure the environment file:

```bash
cp .env.example .env
```

Update the following variables in `.env`:
```env
# Neon Database Configuration
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=86400000
```

### 2. Database Setup

Execute the SQL schema in your Neon database:

```sql
-- Run the contents of database/schema.sql in your Neon console
```

### 3. Docker Deployment

Build and run the application:

```bash
./start.sh
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

### 4. Local Development (Optional)

For local development with pnpm:

```bash
# Frontend
cd frontend
pnpm install
pnpm dev

# Backend
cd backend
./mvnw spring-boot:run
```

## 📁 Project Structure

```
saas-core/
├── backend/
│   ├── src/main/java/com/saas/core/
│   │   ├── config/          # Security configuration
│   │   ├── controller/       # REST controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data repositories
│   │   ├── security/       # JWT and security components
│   │   └── service/       # Business logic
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/       # API services
│   │   ├── types/         # TypeScript interfaces
│   │   └── main.tsx       # App entry point
│   ├── Dockerfile
│   ├── package.json       # pnpm configuration
│   └── pnpm-lock.yaml    # pnpm lockfile
├── database/
│   └── schema.sql         # Database schema
├── docker-compose.yml      # Container orchestration
├── .env                  # Environment variables
└── README.md
```

## 🔐 Multi-tenant Architecture

### Database Design
- **Companies**: Tenant information with unique subdomains
- **Users**: User accounts linked to tenants via `tenant_id`
- **Subscriptions**: Subscription management per tenant

### Security Features
- **JWT Tokens**: Include `tenant_id` for data isolation
- **Row-Level Security**: All business tables include `tenant_id`
- **Optimized Indexes**: Composite indexes for `(tenant_id, id)`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new company and admin user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/validate` - Validate JWT token

## 🎯 Features Implemented

### ✅ Core Features
- [x] Multi-tenant database schema
- [x] Company and user registration (single transaction)
- [x] JWT authentication with tenant context
- [x] React onboarding form with validation
- [x] Axios interceptors for auth management
- [x] Docker containerization with pnpm
- [x] TypeScript interfaces and types
- [x] pnpm package management

### 🔄 Next Steps
- [ ] Implement user management dashboard
- [ ] Add subscription billing integration
- [ ] Create role-based permissions
- [ ] Implement audit logging
- [ ] Add email verification
- [ ] Create admin panel

## 🛠️ Development

### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Development with pnpm
```bash
cd frontend
pnpm install
pnpm dev
```

### pnpm Benefits
- **Fast**: Up to 2x faster than npm
- **Efficient**: Saves disk space via shared dependencies
- **Strict**: More reliable dependency resolution
- **Monorepo Ready**: Perfect for multi-package projects

## 📊 Database Schema

### Companies Table
```sql
- id (UUID PK)
- name (VARCHAR)
- subdomain (VARCHAR UNIQUE)
- created_at, updated_at (TIMESTAMP)
```

### Users Table
```sql
- id (UUID PK)
- tenant_id (UUID FK → companies.id)
- email (VARCHAR)
- password_hash (VARCHAR)
- role (ENUM: USER, ADMIN, SUPER_ADMIN)
- created_at, updated_at (TIMESTAMP)
```

### Subscriptions Table
```sql
- id (UUID PK)
- tenant_id (UUID FK → companies.id)
- plan (ENUM: FREE, BASIC, PRO, ENTERPRISE)
- status (ENUM: ACTIVE, CANCELLED, SUSPENDED, EXPIRED)
- starts_at, ends_at (TIMESTAMP)
- created_at, updated_at (TIMESTAMP)
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: Neon PostgreSQL connection string
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRATION`: Token expiration time in milliseconds
- `FRONTEND_URL`: Frontend application URL
- `BACKEND_URL`: Backend API URL

### Docker Configuration
- Frontend runs on port 5173 (Vite dev server)
- Backend runs on port 8080 (Spring Boot)
- Both services communicate via internal Docker network
- Uses pnpm for dependency management

## 🚨 Security Notes

1. **JWT Secret**: Always use a strong, unique secret in production
2. **Database**: Use SSL connections (enforced by Neon)
3. **CORS**: Configure allowed origins properly
4. **Password Hashing**: BCrypt with strength 10
5. **Input Validation**: Server-side validation on all endpoints

## 📝 Package Management with pnpm

### Why pnpm?
- **Performance**: Faster installation times
- **Disk Space**: Shared dependencies reduce storage
- **Reliability**: Strict dependency resolution
- **Compatibility**: Drop-in replacement for npm

### Common pnpm Commands
```bash
pnpm install              # Install dependencies
pnpm dev                 # Start development server
pnpm build               # Build for production
pnpm add <package>       # Add new dependency
pnpm remove <package>    # Remove dependency
pnpm update              # Update all dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Built with ❤️ for the SaaS ecosystem using pnpm**
# saas-core
# saas-core
