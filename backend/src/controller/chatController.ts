import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import Chat from "../model/chat";
import { Types } from "mongoose";

export async function getChats(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({ message: "UserId is missing" });
      return;
    }

    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email avatar")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    const formattedChat = chats.map((chat) => {
      const otherParticipants = chat.participants.find(
        (p) => p._id.toString() !== userId,
      );

      return {
        _id: chat._id,
        participants: otherParticipants ?? null,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        createdAt: chat.createdAt,
      };
    });

    res.json(formattedChat);
  } catch (error) {
    res.status(500);
    next(error);
  }
}

export async function getOrCreateChat(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { participantsId } = req.params;

    if (!userId || !participantsId) {
      res.status(400).json({ message: "UserId and ParticipantsId missing" });
      return;
    }

    if (userId === participantsId) {
      res.status(400).json({ message: "Cannot create chat with yourself" });
    }

    // check if chat already exist
    let chat = await Chat.findOne({
      participants: { $all: [userId, participantsId] },
    })
      .populate("participants", "name email avatar")
      .populate("lastMessage");

    if (!chat) {
      const newChat = new Chat({ participants: [userId, participantsId] });
      await newChat.save();

      chat = await newChat.populate("participants", "name email avatar");
    }

    const otherParticipants = chat.participants.find(
      (p: any) => p._id.toString() !== userId,
    );

    res.json({
      _id: chat._id,
      participant: otherParticipants ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
}
