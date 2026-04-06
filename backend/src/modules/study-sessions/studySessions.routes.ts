import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as sessionsController from "./studySessions.controller";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /study-sessions:
 *   post:
 *     summary: Criar sessão de estudo
 *     tags: [Study Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [subjectId, studyDate, durationMinutes]
 *             properties:
 *               subjectId:
 *                 type: string
 *                 format: uuid
 *               studyDate:
 *                 type: string
 *                 format: date
 *                 example: '2026-04-06'
 *               durationMinutes:
 *                 type: integer
 *                 minimum: 1
 *               description:
 *                 type: string
 *               didExercises:
 *                 type: boolean
 *               exerciseCount:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sessão criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudySession'
 *   get:
 *     summary: Listar sessões
 *     tags: [Study Sessions]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: didExercises
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista paginada de sessões
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudySession'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *
 * /study-sessions/{id}/photos:
 *   post:
 *     summary: Upload de foto
 *     tags: [Study Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Foto enviada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Photo'
 */

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
