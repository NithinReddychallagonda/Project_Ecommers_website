# 🛍️ StyleCart

A modern full-stack e-commerce fashion application built with React, TypeScript, and MongoDB. StyleCart features a complete shopping experience with product browsing, cart management, user authentication, admin dashboard, and an AI-powered outfit recommender.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Architecture & Workflow](#architecture--workflow)
- [Authentication Flow](#authentication-flow)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Roadmap](#roadmap)

---

## Overview

StyleCart is a full-stack fashion e-commerce platform. The frontend is a Vite + React + TypeScript SPA styled with Tailwind CSS and shadcn/ui. The backend is an Express.js REST API connected to MongoDB Atlas via Mongoose, secured with JWT-based authentication.

The project was originally built with Supabase (PostgreSQL) and later migrated to MongoDB Atlas + Express.js. All auth now flows through a custom REST API.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 6 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| shadcn/ui + Radix UI | Accessible component library |
| React Router DOM v6 | Client-side routing |
| TanStack Query v5 | Server state management |
| React Hook Form + Zod | Form handling & validation |
| Recharts | Data visualization (admin) |
| Sonner | Toast notifications |
| Playwright | End-to-end testing |
| Vitest | Unit testing |

### Backend
| Technology | Purpose |
|---|---|
| Express.js 5 | REST API framework |
| MongoDB Atlas | Cloud NoSQL database |
| Mongoose | ODM (Object Document Mapper) |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |
| dotenv | Environment configuration |

---

## Project Structure

```
Stylecart_project/
├── index.html                  # SPA entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind theme config
├── tsconfig.json               # TypeScript config
├── playwright.config.ts        # E2E test config
├── vitest.config.ts            # Unit test config
├── docker-compose.yml          # Docker setup
├── .env                        # Frontend env vars
│
├── src/
│   ├── main.tsx                # React app bootstrap
│   ├── App.tsx                 # Root component & routing
│   ├── index.css               # Global styles
│   │
│   ├── api/
│   │   └── client.ts           # HTTP API client (JWT auth)
│   │
│   ├── context/
│   │   ├── AuthContext.tsx     # Auth state (user, profile, isAdmin)
│   │   └── CartContext.tsx     # Cart state (items, totals, persistence)
│   │
│   ├── pages/
│   │   ├── Index.tsx           # Home page
│   │   ├── CategoryPage.tsx    # Product listing by category
│   │   ├── ProductPage.tsx     # Product detail page
│   │   ├── CheckoutPage.tsx    # Checkout flow
│   │   ├── OrderSuccessPage.tsx # Post-order confirmation
│   │   ├── UserDashboard.tsx   # User profile management
│   │   ├── AIRecommendation.tsx # AI outfit recommender
│   │   ├── AdminLoginPage.tsx  # Admin-specific login
│   │   ├── AdminDashboard.tsx  # Admin panel
│   │   └── NotFound.tsx        # 404 page
│   │
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── CartDrawer.tsx      # Slide-out cart panel
│   │   ├── AuthModal.tsx       # Login/Signup modal
│   │   ├── HeroSection.tsx     # Landing hero banner
│   │   ├── FeaturedCollection.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── Categories.tsx
│   │   ├── SocialProof.tsx
│   │   ├── UrgencyBanner.tsx
│   │   ├── Footer.tsx
│   │   ├── NavLink.tsx
│   │   └── ui/                 # shadcn/ui component library
│   │
│   ├── data/
│   │   └── products.ts         # Static product catalog
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Responsive breakpoint hook
│   │   └── use-toast.ts        # Toast notification hook
│   │
│   ├── lib/
│   │   └── utils.ts            # Utility helpers (cn, etc.)
│   │
│   ├── assets/                 # Product & category images
│   └── test/                   # Unit test setup
│
└── server/
    ├── server.js               # Express app entry point
    ├── package.json            # Server dependencies
    ├── .env                    # Server env vars (MongoDB URI, JWT)
    ├── .env.example            # Env template
    │
    ├── models/
    │   ├── User.js             # Mongoose User schema
    │   └── LoginActivity.js    # Login activity tracking
    │
    ├── routes/
    │   └── auth.js             # Auth API routes
    │
    └── middleware/
        └── auth.js             # JWT verification middleware
```

---

## Features

### Customer Features
- **Browse Products** — Home page, category pages (Co-ords, Streetwear, Essentials), and individual product detail pages
- **Shopping Cart** — Add/remove/update items with size selection; cart persists in `localStorage`
- **User Authentication** — Signup, login, logout via JWT; modal-based auth flow
- **User Dashboard** — View and edit profile (name, phone, address, city, pincode)
- **Checkout** — Multi-step checkout with address and payment information
- **Order Success Page** — Confirmation screen after purchase
- **AI Outfit Recommender** — AI-powered style recommendation page
- **Responsive Design** — Mobile-first UI with drawer navigation on small screens

### Admin Features
- **Separate Admin Login** — Dedicated `/admin-login` route with role verification
- **Admin Dashboard** — Overview panel (order/user management placeholders)
- **Role-Based Access** — Backend enforces `admin` role via JWT middleware

---

## Architecture & Workflow

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
│                                                             │
│   React SPA (port 8080)                                     │
│   ┌───────────┐  ┌──────────────┐  ┌──────────────────┐   │
│   │  AuthCtx  │  │   CartCtx    │  │  TanStack Query  │   │
│   └─────┬─────┘  └──────┬───────┘  └────────┬─────────┘   │
│         │               │                    │              │
│         └───────────────┴────────────────────┘              │
│                         │                                    │
│               src/api/client.ts                             │
│               (fetch + JWT headers)                         │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP/REST
                          ▼
┌─────────────────────────────────────────────────────────────┐
│               Express.js Server (port 5000)                  │
│                                                             │
│   POST /api/auth/signup                                     │
│   POST /api/auth/signin                                     │
│   POST /api/auth/admin-login                                │
│   GET  /api/auth/me          ← requires JWT                 │
│   PUT  /api/auth/profile     ← requires JWT                 │
│   POST /api/auth/check-admin ← requires JWT + admin role    │
│   GET  /api/auth/users       ← requires JWT + admin role    │
│                                                             │
│   Middleware: CORS, body-parser, JWT verification           │
└─────────────────────────┬───────────────────────────────────┘
                          │ Mongoose ODM
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              MongoDB Atlas (Cloud)                           │
│                                                             │
│   Cluster: stylecart.xdscufn.mongodb.net                   │
│   Database: stylecart                                       │
│   Collections: users, loginactivities                       │
└─────────────────────────────────────────────────────────────┘
```

### Request Lifecycle

```
User Action
    │
    ▼
React Component (e.g. AuthModal, ProductPage)
    │
    ▼
Context / Hook (AuthContext, CartContext, useCart)
    │
    ▼
API Client (src/api/client.ts)
    │  Attaches Authorization: Bearer <token>
    ▼
Express Route Handler (server/routes/auth.js)
    │
    ▼
JWT Middleware (server/middleware/auth.js)  ← for protected routes
    │
    ▼
Mongoose Model (server/models/User.js)
    │
    ▼
MongoDB Atlas
    │
    ▼
JSON Response → React State Update → UI Re-render
```

### Cart Workflow

```
Add to Cart
    │
    ▼
CartContext.addToCart(product, size, qty)
    │
    ├─ If item exists → increment quantity
    └─ If new item → append to items array
    │
    ▼
localStorage.setItem('cart', JSON.stringify(items))
    │
    ▼
CartDrawer re-renders with updated totals
```

---

## Authentication Flow

```
┌──────────┐     signup/signin      ┌─────────────────┐
│  Browser │ ─────────────────────► │  Express Server │
│          │ ◄──── JWT Token ─────  │                 │
│          │                        │  bcrypt verify  │
│          │                        │  JWT sign       │
└────┬─────┘                        └─────────────────┘
     │
     │  localStorage.setItem('authToken', token)
     │
     ▼
Every subsequent API call:
  Authorization: Bearer <token>
     │
     ▼
server/middleware/auth.js → jwt.verify()
     │
     ├─ Valid → req.user = decoded payload → next()
     └─ Invalid → 401 Unauthorized
```

**Token details:** JWT expires in 7 days. Payload contains `userId`, `email`, and `role`.

---

## API Reference

### Base URL
```
http://localhost:5000/api
```

### Auth Endpoints

| Method | Endpoint | Auth Required | Body | Description |
|--------|----------|---------------|------|-------------|
| POST | `/auth/signup` | No | `{ email, password, full_name }` | Register new user |
| POST | `/auth/signin` | No | `{ email, password }` | Login, returns JWT |
| POST | `/auth/admin-login` | No | `{ email, password }` | Admin login, verifies `role === 'admin'` |
| GET | `/auth/me` | Yes (JWT) | — | Get current user profile |
| PUT | `/auth/profile` | Yes (JWT) | `{ full_name, phone, address, city, pincode }` | Update profile |
| POST | `/auth/check-admin` | Yes (JWT) | — | Returns `{ isAdmin: boolean }` |
| GET | `/auth/users` | Yes (JWT + Admin) | — | List all users |

### Health Check

```
GET http://localhost:5000/health
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun
- MongoDB Atlas account (free tier works)

### 1. Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd Stylecart_project

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment

**Backend** (`server/.env`):
```env
MONGODB_URI=mongodb+srv://StyleCart:<your_password>@stylecart.xdscufn.mongodb.net/?appName=StyleCart
JWT_SECRET=your_super_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:8080
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Backend

```bash
cd server
npm run dev
# Server running at http://localhost:5000
```

### 4. Start Frontend

```bash
# In project root
npm run dev
# App running at http://localhost:8080
```

### Using the Setup Script

```bash
chmod +x setup.sh
./setup.sh
```

---

## Environment Variables

### Frontend (`.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API base URL |

### Backend (`server/.env`)

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret for signing JWT tokens |
| `PORT` | 5000 | Server port |
| `FRONTEND_URL` | `http://localhost:8080` | Allowed CORS origin |

---

## Available Scripts

### Frontend

```bash
npm run dev          # Start Vite dev server (port 8080)
npm run build        # Production build to /dist
npm run build:dev    # Dev-mode build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run Vitest (unit tests)
npm run test:watch   # Run Vitest in watch mode
npm run predeploy    # Build before deploy
npm run deploy       # Deploy to GitHub Pages (gh-pages)
```

### Backend

```bash
npm run dev    # Start server with file watching (nodemon)
npm start      # Start server (production)
npm install    # Install dependencies
```

---

## Testing

### Unit Tests (Vitest)

```bash
npm run test
# or watch mode
npm run test:watch
```

Test files live in `src/test/`. The setup uses `jsdom` as the test environment with `@testing-library/react`.

### End-to-End Tests (Playwright)

```bash
npx playwright test
```

Config: `playwright.config.ts`
Fixtures: `playwright-fixture.ts`

---

## Deployment

### Frontend (GitHub Pages)

```bash
npm run deploy
```

This runs `predeploy` (builds the app) then publishes the `/dist` folder to the `gh-pages` branch.

### Backend (Any Node.js host)

Recommended platforms: Render, Railway, Heroku, AWS EC2, or DigitalOcean.

```bash
# Set env variables on your host, then:
npm start
```

### Docker

A `docker-compose.yml` is included for containerized deployment:

```bash
docker-compose up --build
```

---

## Security

| Item | Status | Notes |
|---|---|---|
| Password hashing | ✅ | bcryptjs with salt rounds |
| JWT authentication | ✅ | 7-day expiry |
| CORS configured | ✅ | Restricted to `FRONTEND_URL` |
| Admin role enforcement | ✅ | Middleware checks `role === 'admin'` |
| Input validation | ✅ | Backend validates request bodies |
| HTTPS | ⚠️ | Enable for production |
| JWT_SECRET in production | ⚠️ | Use a strong random secret |
| Credentials management | ⚠️ | Never commit `.env` files |

---

## Roadmap

- [ ] Order management endpoints and order history
- [ ] Product catalog API (move products from static to DB)
- [ ] Payment gateway integration (Razorpay / Stripe)
- [ ] Email notifications (order confirmation, password reset)
- [ ] Production deployment with HTTPS
- [ ] CDN for static assets
- [ ] Application monitoring and logging
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Inventory management in admin dashboard

---

## Test Credentials

> These are for local development only.

| Role | Email | Password |
|---|---|---|
| User | user@example.com | password123 |
| Admin | admin@example.com | admin123 |

---

## Common Issues

| Problem | Solution |
|---|---|
| `MongoDB connection error` | Check `MONGODB_URI` in `server/.env` |
| `CORS error` | Ensure `FRONTEND_URL` matches your frontend origin |
| `Invalid admin credentials` | Create admin user with `role: 'admin'` in MongoDB |
| `Token expired` | Clear `localStorage`, then log in again |
| `Cannot find module` | Run `npm install` in the affected directory |
| `Port already in use` | Kill the process on port 5000 or 8080 |
