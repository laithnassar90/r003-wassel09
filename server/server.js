// server/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import usersRouter from './routes/users.js';
import adminRouter from './routes/admin.js';
import tripsRouter from './routes/trips.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔐 Security Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));
app.use(express.json());

// 🛡️ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// 🚏 API Routes
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/trips', tripsRouter);

// 🧪 Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// 🧱 Serve Vite Build (Production Only)
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientDistPath));

  // SPA Fallback for non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

// 🛑 Global Error Handler
app.use(errorHandler);

// 🚀 Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Wassel backend running at http://localhost:${PORT}`);
});
