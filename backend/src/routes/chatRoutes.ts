import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getChats, getOrCreateChat } from "../controller/chatController";

const router = Router();

router.get("/", protectRoute, getChats);

router.post("/with/:participantsId", protectRoute, getOrCreateChat);

export default router;
