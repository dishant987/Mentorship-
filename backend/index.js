import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import prisma from "./db/conn.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTED_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Attach Prisma to req for access in routes
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start the server
app.listen(PORT, async () => {
  try {
    console.log(`Server running on port ${PORT}`);
    // Test Prisma connection
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
