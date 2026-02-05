import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getUsers } from "../controller/userController";

const router = Router();

router.get("/all", protectRoute, getUsers);

export default router;
