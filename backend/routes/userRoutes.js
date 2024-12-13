import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import prisma from "../db/conn.js";

const router = express.Router();

router.post("/createprofile", verifyToken, async (req, res) => {
  try {
    const { name, email, bio, role, skills, interests } = req.body;

    const userId = req.user; // Extracted from the token

    // Check for required fields
    if (!name || !email || !bio || !role || !skills || !interests) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailExists = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create or update the profile
    const profile = await prisma.profile.create({
      data: {
        name,
        email,
        bio,
        role,
        skills,
        interests,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({
      message: "Profile created  successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/profile",verifyToken, async (req, res) => {
  const userId = req.user;
  try {
    const userProfile = await prisma.profile.findUnique({
      where: {
        userId: userId, // Use `userId` as the query key
      },
    });

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/deleteprofile/:id", async (req, res) => {
  const userId = req.user;
  const id = req.params.id;
  try {
    const user = await prisma.profile.delete({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAllProfiles", async (req, res) => {

  try {
    const userProfile = await prisma.profile.findMany();

    if (!userProfile) {
      return res.status(404).json({ message: "Profile Data not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
