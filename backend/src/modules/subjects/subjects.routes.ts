import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as subjectsController from "./subjects.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Criar disciplina
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Matemática
 *               color:
 *                 type: string
 *                 example: '#7C3AED'
 *     responses:
 *       201:
 *         description: Disciplina criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       409:
 *         description: Disciplina já existe
 *   get:
 *     summary: Listar disciplinas
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Lista de disciplinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *
 * /subjects/{id}:
 *   put:
 *     summary: Atualizar disciplina
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Disciplina atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Não encontrada
 *   delete:
 *     summary: Deletar disciplina
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Deletada com sucesso
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Não encontrada
 */

router.post("/", subjectsController.create);
router.get("/", subjectsController.list);
router.put("/:id", subjectsController.update);
router.delete("/:id", subjectsController.remove);

export { router as subjectsRoutes };
