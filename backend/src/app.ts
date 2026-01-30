import express from "express";

import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running up" });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", chatRoutes);
app.use("/api/v1", messageRoutes);
app.use("/api/v1", userRoutes);

export default app;
