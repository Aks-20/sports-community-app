import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import { sendVerificationEmail } from './controllers/sendMail.controller.js'; // adjust path as needed
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();
app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

console.log("🚀 Starting server...");








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
