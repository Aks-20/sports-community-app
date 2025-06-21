import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import { sendVerificationEmail } from './controllers/sendMail.controller.js'; // adjust path as needed


dotenv.config();



console.log("🚀 Starting server...");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/sendemail',sendVerificationEmail)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
  try {
    console.log("🔌 Connecting to DB...");
    await db();
    console.log(`✅ Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
});
