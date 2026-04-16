# StyleCart - MongoDB Migration Complete ✅

## Overview
StyleCart has been successfully migrated from Supabase to MongoDB with a Node.js/Express backend. This application features a complete e-commerce platform with user authentication, shopping cart, and admin dashboard.

---

## Project Structure

```
├── src/                    # Frontend (React + TypeScript + Vite)
│   ├── api/               # API client utilities
│   │   └── client.ts      # MongoDB API client
│   ├── components/        # React components
│   ├── context/           # React contexts
│   │   ├── AuthContext.tsx    # Auth with MongoDB
│   │   └── CartContext.tsx    # Shopping cart
│   ├── pages/             # Page components
│   ├── data/              # Static product data
│   └── App.tsx            # Main app component
│
├── server/                # Backend (Node.js + Express)
│   ├── models/            # MongoDB Mongoose models
│   │   └── User.js        # User schema with auth
│   ├── routes/            # API routes
│   │   └── auth.js        # Authentication endpoints
│   ├── middleware/        # Express middleware
│   │   └── auth.js        # JWT authentication
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env              # Backend configuration

├── package.json           # Frontend dependencies (Supabase removed)
├── .env                   # Frontend configuration
└── vite.config.ts        # Vite configuration
```

---

## Setup Instructions

### 1. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

#### Configure MongoDB Connection

Update `server/.env` with your MongoDB Atlas credentials:

```env
MONGODB_URI=mongodb+srv://StyleCart:<your_password>@stylecart.xdscufn.mongodb.net/?appName=StyleCart
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
FRONTEND_URL=http://localhost:8080
```

**Important:** Replace `<your_password>` with your actual MongoDB Atlas password.

#### Start Backend Server

```bash
npm run dev
# or for production
npm start
```

The server will run on `http://localhost:5000`

---

### 2. Frontend Setup

In the root project directory:

```bash
npm install
```

The Supabase dependency has been removed. The application now uses:
- Custom API client for MongoDB communication
- JWT tokens stored in localStorage
- Direct HTTP requests for all API calls

#### Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

---

## Key Features

### 🔐 Authentication
- **Sign Up:** Create new account with email and password
- **Sign In:** Login with credentials
- **JWT Tokens:** Secure token-based authentication
- **Profile Management:** Update user information
- **Admin Access:** Special login for admin dashboard

### 🛒 Shopping
- Product catalog with categories
- Shopping cart management
- Checkout with delivery address
- Order placement (local storage for now)
- Order history in user dashboard

### 👨‍💼 Admin Dashboard
- View all orders
- Order status management (Pending, Shipped, Delivered)
- Revenue tracking
- User management

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login with email/password
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/check-admin` - Check if user is admin
- `GET /api/auth/users` - Get all users (admin only)

### Request/Response Format

**Login Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "message": "Signed in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "New York",
    "pincode": "100001"
  }
}
```

---

## Test Credentials

### Demo User
- Email: `user@example.com`
- Password: `password123`

### Demo Admin
- Email: `admin@example.com`
- Password: `admin123`

**Note:** Create these accounts using the signup flow first, then manually set role to 'admin' in MongoDB.

---

## MongoDB Collections

The application uses the following collections:

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed with bcrypt),
  full_name: String,
  phone: String,
  address: String,
  city: String,
  pincode: String,
  role: "user" | "admin",
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## How to Create Admin User

1. Sign up a new account through the UI
2. Connect to MongoDB Atlas
3. Find the user document you just created
4. Update the `role` field from "user" to "admin"

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## Frontend Changes From Supabase

### Removed
- `@supabase/supabase-js` dependency
- Supabase integration folder
- Supabase RPC calls
- Supabase direct database queries

### Added
- Custom API client (`src/api/client.ts`)
- MongoDB-compatible AuthContext
- JWT token management

### Updated Files
1. **AuthContext.tsx** - MongoDB API calls instead of Supabase Auth
2. **AdminLoginPage.tsx** - Direct API login
3. **CheckoutPage.tsx** - Removed Supabase order queries
4. **UserDashboard.tsx** - Removed Supabase user data queries
5. **AdminDashboard.tsx** - Removed Supabase queries
6. **package.json** - Removed Supabase dependency
7. **.env** - Added VITE_API_URL, removed Supabase keys

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```env
MONGODB_URI=mongodb+srv://StyleCart:<password>@stylecart.xdscufn.mongodb.net/?appName=StyleCart
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
FRONTEND_URL=http://localhost:8080
```

---

## Security Notes

⚠️ **Important for Production:**

1. Change the `JWT_SECRET` in `server/.env` to a strong, random key
2. Set `FRONTEND_URL` to your actual frontend domain
3. Enable HTTPS for all API calls
4. Store sensitive credentials in environment variables
5. Never commit `.env` files with real credentials
6. Implement rate limiting on API endpoints
7. Add CORS properly configured for your domain

---

## Future Enhancements

### Planned Features
- [ ] Order management API endpoints
- [ ] Product management system
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Order tracking with real-time updates
- [ ] Wishlist feature
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Analytics and reporting

### Backend API Improvements
- [ ] Add order creation and retrieval endpoints
- [ ] Implement product endpoints
- [ ] Add file upload for product images
- [ ] Implement notification system
- [ ] Add transaction logging

---

## Common Issues & Solutions

### Issue: "MongoDB connection error"
**Solution:** Verify MongoDB URI in `server/.env` and ensure:
- Password is correctly URL-encoded
- Network access is allowed in Atlas
- IP whitelist includes your system

### Issue: "CORS error" when making API calls
**Solution:** Ensure `FRONTEND_URL` in `server/.env` matches your frontend origin

### Issue: "Invalid token" on API calls
**Solution:** Token may have expired. Clear localStorage and login again:
```javascript
localStorage.clear()
```

### Issue: "Admin login fails"
**Solution:** Verify user has `role: "admin"` in MongoDB users collection

---

## Performance Tips

1. **Enable compression** in Express
2. **Use MongoDB indexes** on frequently queried fields
3. **Implement caching** for product data
4. **Optimize image sizes** in product listings
5. **Use lazy loading** for product images

---

## Support & Documentation

- **MongoDB Documentation:** https://docs.mongodb.com/
- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/
- **Mongoose:** https://mongoosejs.com/

---

## License

proprietary - StyleCart 2026

---

## Summary

✅ **Complete Migration Done:**
- Backend: Node.js + Express + MongoDB
- Frontend: React with MongoDB API client
- Authentication: JWT tokens with bcrypt hashing
- Database: MongoDB Atlas cluster
- Auth endpoints fully functional
- Login/Signup working properly
- Admin dashboard ready for order management

**Ready to enhance with:**
- Order management endpoints
- Product admin panel
- Payment integration
- Email notifications
