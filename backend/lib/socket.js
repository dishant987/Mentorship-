// socket.js
import { Server } from "socket.io";

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTED_URL, // Replace with actual frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  // Handle Socket.IO connections
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for connection requests
    socket.on("send_request", (data) => {
      console.log("Connection request sent:", data);

      // Emit the event to the receiver (real-time notification)
      io.emit("receive_request", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io; // Return the io instance for usage in the main app if needed
};
