import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/stylecart';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection — Compass must use the SAME URI as MONGODB_URI (see server/.env).
// User accounts are stored in database from the URI path (e.g. stylecart) → collection "users".
// Passwords are bcrypt hashes in DB; plain text is never stored.
mongoose.connect(mongoUri)
  .then(() => {
    const dbName = mongoose.connection.name;
    const isLocal =
      /127\.0\.0\.1|localhost/.test(mongoUri) && !mongoUri.includes('mongodb+srv');
    console.log('MongoDB connected successfully');
    console.log(
      `  Database: "${dbName}"  |  Collection: "users"  |  ${isLocal ? 'Local (Docker/host)' : 'Remote (e.g. Atlas)'}`
    );
    if (isLocal) {
      console.log(
        '  In Compass: mongodb://127.0.0.1:27017 → DB "' +
          dbName +
          '" → "users" (accounts), "login_activity" (each signup/login).'
      );
    }

    // Ensure admin user exists for admin login
    (async () => {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || 'challagondanithinreddy10@gmail.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Nithin@7105';
        const adminName = process.env.ADMIN_FULL_NAME || 'Admin';

        let admin = await User.findOne({ role: 'admin' });

        if (!admin) {
          admin = new User({
            email: adminEmail,
            password: adminPassword,
            full_name: adminName,
            role: 'admin',
            verified: true,
          });
          await admin.save();
          console.log(`Admin user created: ${adminEmail}`);
        } else {
          const passwordMatches = await admin.matchPassword(adminPassword);
          if (admin.email !== adminEmail || !passwordMatches || admin.full_name !== adminName) {
            admin.email = adminEmail;
            admin.password = adminPassword;
            admin.full_name = adminName;
            await admin.save();
            console.log(`Admin user synced with env values: ${adminEmail}`);
          } else {
            console.log(`Admin user already up-to-date: ${adminEmail}`);
          }
        }
      } catch (seedErr) {
        console.error('Admin seed error:', seedErr);
      }
    })();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
