import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as subjectsController from "./subjects.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", subjectsController.create);
router.get("/", subjectsController.list);
router.put("/:id", subjectsController.update);
router.delete("/:id", subjectsController.remove);

export { router as subjectsRoutes };
