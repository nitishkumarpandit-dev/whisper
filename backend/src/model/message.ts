import mongoose, { Schema, type Document } from "mongoose";

interface IMessage extends Document {
  chat: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

// index for fastest queries
messageSchema.index({ chat: 1, createdAt: 1 }); // Oldest one first

const Message = mongoose.model("Message", messageSchema);

export default Message;
