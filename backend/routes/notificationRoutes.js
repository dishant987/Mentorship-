import prisma from "../db/conn";
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/notifications", verifyToken, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user,
      },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/send-notification", verifyToken, async (req, res) => {
  const { title, message } = req.body;
  try {
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        userId: req.user,
      },
    });
    res.status(201).json({ message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/notifications/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const notification = await prisma.notification.delete({
      where: {
        id,
      },
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
