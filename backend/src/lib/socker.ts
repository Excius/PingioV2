import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

export function getRecevicerSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN || "http://localhost:5173"],
  },
});

const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && typeof userId === "string") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId as string];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
