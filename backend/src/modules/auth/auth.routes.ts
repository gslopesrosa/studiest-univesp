import { Router } from "express";
import { registerHandler, loginHandler, meHandler } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/me", authMiddleware, meHandler);

export { router as authRoutes };
