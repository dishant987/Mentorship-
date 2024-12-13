import jwt from "jsonwebtoken";
import prisma from "../db/conn.js";
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(201).json({ user, token, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // Set cookie
    res.cookie("auth-token", token, {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
    });

    // Send response
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", verifyToken, (req, res) => {
  res.clearCookie("auth-token");
  res.status(200).json({ message: "Logout successful" });
});

export default router;
