import { Server, Socket } from "socket.io";
import prisma from "../db/conn.js";
import express from "express";
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await prisma.notification.findMany({
      where: { receiverId: userId },
      include: {
        Profile: true, // Include profile data if needed
      },
    });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.post("/connect", async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: senderId, // Use `userId` as the query key
      },
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const notification = await prisma.notification.create({
      data: {
        senderId: profile.id,
        receiverId,
        profileId: profile.id,
      },
    });

    res.json(notification);
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

export default router;
