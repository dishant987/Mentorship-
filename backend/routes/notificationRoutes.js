import prisma from "../db/conn.js";
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:userId", verifyToken, async (req, res) => {
  const userId = req.user;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const notifications = await prisma.notification.findMany({
      where: { receiverId: profile.id, status: "pending" },
    });
    console.log(notifications);
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.post("/connect", async (req, res) => {
  const { senderId, receiverId } = req.body;
  console.log(senderId, receiverId);
  try {
    const senderprofile = await prisma.profile.findUnique({
      where: { userId: senderId },
    });
    const receiverProfile = await prisma.profile.findUnique({
      where: { id: receiverId },
    });

    if (!senderprofile || !receiverProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const existingNotification = await prisma.notification.findFirst({
      where: {
        senderId: senderprofile.id,
        receiverId: receiverId,
      },
    });

    if (existingNotification) {
      return res.status(400).json({ message: "Notification already exists" });
    }

    const notification = await prisma.notification.create({
      data: {
        senderId: senderprofile.id,
        receiverId: receiverProfile.id,
        senderName: senderprofile.name,
        receiverName: receiverProfile.name,
      },
    });

    res.json(notification);
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.post("/accept", async (req, res) => {
  const { senderId, receiverId } = req.body;
  console.log(senderId, receiverId);
  try {
    const senderprofile = await prisma.profile.findUnique({
      where: { userId: senderId },
    });
    const receiverProfile = await prisma.profile.findUnique({
      where: { id: receiverId },
    });

    if (!senderprofile || !receiverProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const existingNotification = await prisma.notification.findFirst({
      where: {
        senderId: senderprofile.id,
        receiverId: receiverId,
      },
    });

    if (!existingNotification) {
      return res.status(400).json({ message: "Notification not found" });
    }

    const notification = await prisma.notification.update({
      where: {
        id: existingNotification.id,
      },
      data: {
        status: "accepted",
      },
    });

    res.json(notification);
  } catch (error) {
    console.error("Error accepting notification:", error.message);
    res.status(500).json({ error: "Failed to accept notification" });
  }
});

export default router;
