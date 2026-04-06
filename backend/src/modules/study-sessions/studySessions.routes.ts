import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as sessionsController from "./studySessions.controller";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", sessionsController.create);
router.get("/", sessionsController.list);
router.get("/:id", sessionsController.getOne);
router.put("/:id", sessionsController.update);
router.delete("/:id", sessionsController.remove);
router.post(
  "/:id/photos",
  upload.single("photo"),
  sessionsController.uploadPhoto,
);
router.delete("/:id/photos/:photoId", sessionsController.removePhoto);

export { router as studySessionsRoutes };
