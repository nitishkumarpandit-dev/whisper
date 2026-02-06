import { Socket, Server as SocketServer } from "socket.io";
import { Server as httpServer } from "http";
import { verifyToken } from "@clerk/express";

import Message from "../model/message";
import Chat from "../model/chat";
import User from "../model/User";

interface socketWithUserId extends Socket {
  userId: string;
}

// Store online users in memory: userId -> socketId
export const onlineUsers: Map<string, string> = new Map();

export const initilizeServer = (httpServer: httpServer) => {
  const allowOrigin = [
    "http://localhost:8081",
    "http://localhost:5173",
    process.env.FRONTEND_URL as string,
  ];

  const io = new SocketServer(httpServer, { cors: { origin: allowOrigin } });

  // verify socket connection - if user is authenticated we will store the user id in socket

  io.use(async (Socket, next) => {
    const token = Socket.handshake.auth.token; // This is what user will send from client

    if (!token) {
      return next(new Error("Authentication Error!"));
    }

    try {
      const session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      const clerkId = session.sub;

      const user = await User.findOne({ clerkId });

      if (!user) return next(new Error("User not found"));

      (Socket as socketWithUserId).userId = user._id.toString();
    } catch (error: any) {
      next(new Error(error));
    }
  });

  io.on("connection", (socket) => {
    const userId = (socket as socketWithUserId).userId;

    // send list of online users to newly connected client
    socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) });

    // Store user in onlineUser map
    onlineUsers.set(userId, socket.id);

    // Notify other that this user is currently online
    socket.broadcast.emit("online-user", { userId });

    socket.join(`user ${userId}`);

    socket.on("join-chat", (chatId: string) => {
      socket.join(`user: ${chatId}`);
    });

    socket.on("leave-chat", (chatId: string) => {
      socket.leave(`user: ${chatId}`);
    });

    // handline sending message
    socket.on(
      "send-message",
      async (data: { chatId: string; text: string }) => {
        try {
          const { chatId, text } = data;

          const chat = await Chat.findOne({
            _id: chatId,
            participants: userId,
          });

          if (!chat) {
            socket.emit("socket-error", { message: "chat not found" });
            return;
          }

          const message = await Message.create({
            chat: chatId,
            sender: userId,
            text,
          });

          chat.lastMessage = message._id;
          chat.lastMessageAt = new Date();
          chat.save();

          await message.populate("sender", "name email avatar");

          // emit to chat room (for user inside chat)
          io.to(`chat: ${chatId}`).emit("new-message", message);

          // also emit the participant's other room(for chat list view)
          for (const participantId of chat.participants) {
            io.to(`user: ${participantId}`).emit("new-message", message);
          }
        } catch (error) {
          socket.emit("socket-error", { message: "Failed to send message" });
        }
      },
    );

    // TODO
    socket.on("typing", async (data) => {});

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);

      socket.broadcast.emit("user-offline", { userId });
    });
  });

  return io;
};
