import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// File upload middleware (optional if you're using Multer directly in routes)


// Serve uploaded images statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Error handler
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
