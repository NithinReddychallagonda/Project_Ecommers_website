# 🚀 StyleCart - Quick Reference

## ⚡ Quick Start (3 Steps)

### 1. Configure Backend
```bash
cd server
# Edit .env with your MongoDB password
# Replace <db_password> in: mongodb+srv://StyleCart:<db_password>@...
```

### 2. Start Backend
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

### 3. Start Frontend (New Terminal)
```bash
npm run dev
# Runs on http://localhost:8080
```

---

## 📍 Key URLs
- **Frontend:** http://localhost:8080
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/health
- **API Base:** http://localhost:5000/api/auth

---

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| User | user@example.com | password123 |
| Admin | admin@example.com | admin123 |

---

## 🎯 Important Files

### Backend
| File | Purpose |
|------|---------|
| `server/.env` | MongoDB URI & JWT secret |
| `server/server.js` | Express server entry |
| `server/models/User.js` | User schema |
| `server/routes/auth.js` | Auth API endpoints |
| `server/middleware/auth.js` | JWT verification |

### Frontend
| File | Purpose |
|------|---------|
| `src/api/client.ts` | MongoDB API client |
| `src/context/AuthContext.tsx` | Auth state management |
| `src/.env` | frontend config |

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/signup        (email, password, full_name)
POST   /api/auth/signin        (email, password)
POST   /api/auth/admin-login   (email, password)
GET    /api/auth/me            (requires token)
PUT    /api/auth/profile       (requires token)
POST   /api/auth/check-admin   (requires token)
GET    /api/auth/users         (requires token + admin)
```

---

## 🔐 Environment Variables

### Backend (server/.env)
```env
MONGODB_URI=mongodb+srv://StyleCart:<password>@stylecart.xdscufn.mongodb.net/?appName=StyleCart
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:8080
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🛠️ Useful Commands

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run test      # Run tests
npm run lint      # Run ESLint
```

### Backend
```bash
npm run dev       # Start with file watch
npm start         # Start server
npm install       # Install dependencies
```

---

## 🚨 Common Issues Quick Fix

| Problem | Solution |
|---------|----------|
| "MongoDB connection error" | Check MONGODB_URI in server/.env |
| "CORS error" | Verify FRONTEND_URL matches your frontend URL |
| "Invalid admin credentials" | Create admin user in MongoDB |
| "Token expired" | Clear localStorage, login again |
| "Cannot find module" | Run `npm install` in affected directory |

---

## 📊 Authentication Flow

```
User → Signup → Backend → Hash Password → Save to MongoDB → Return JWT
         ↓
        Login → Verify Email/Password → Generate JWT → Return Token
         ↓
        Every Request → Send JWT in Header → Verify Token → Allow/Deny
         ↓
        Logout → Clear localStorage → Done
```

---

## 🔒 Security Checklist

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens expire in 7 days
- ✅ CORS configured for frontend
- ✅ Protected admin routes
- ✅ Input validation on backend
- ⚠️ Change JWT_SECRET for production
- ⚠️ Use HTTPS in production
- ⚠️ Store credentials securely

---

## 💾 Database Connection Info

**Provider:** MongoDB Atlas
**Cluster:** stylecart.xdscufn.mongodb.net
**Database:** stylecart (auto-created)
**Collection:** users

---

## 📈 Scaling Notes

1. Add order management endpoints
2. Implement product catalog
3. Add payment gateway
4. Set up email notifications
5. Deploy to production (Heroku/AWS)
6. Configure CDN for static assets
7. Add monitoring and logging

---

## 📖 Documentation Links

- Full Setup: `MONGODB_SETUP.md`
- Migration Details: `MIGRATION_SUMMARY.md`
- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- MongoDB: https://mongodb.com

---

## 🆘 Need Help?

1. Check `MONGODB_SETUP.md` for detailed setup
2. Review backend console output
3. Check browser console (F12) for errors
4. Verify `.env` files are correct
5. Ensure both frontend and backend are running

---

## ✨ Features

✅ User Authentication (Signup/Login)
✅ User Profiles & Management
✅ Admin Dashboard & Login
✅ Shopping Cart
✅ Product Catalog
✅ Checkout Flow
✅ JWT Token Security
✅ Role-Based Access Control

---

## 🎉 You're All Set!

Everything is configured and ready to go:
- MongoDB connection configured
- Backend API ready
- Frontend ready to communicate
- Sample data available

**Start coding!** 🚀
