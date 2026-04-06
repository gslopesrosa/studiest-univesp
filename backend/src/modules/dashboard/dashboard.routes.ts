import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as dashboardController from "./dashboard.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /dashboard/streak:
 *   get:
 *     summary: Sequência de dias estudados
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Streak atual, melhor streak e total de dias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current:
 *                   type: integer
 *                   description: Sequência atual de dias consecutivos
 *                   example: 3
 *                 best:
 *                   type: integer
 *                   description: Melhor sequência histórica
 *                   example: 14
 *                 totalDays:
 *                   type: integer
 *                   description: Total de dias distintos com estudo
 *                   example: 42
 */
router.get("/streak", dashboardController.streak);

/**
 * @swagger
 * /dashboard/calendar:
 *   get:
 *     summary: Calendário de estudos do mês
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2026
 *         description: Ano (padrão — ano atual)
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           example: 4
 *         description: Mês (padrão — mês atual)
 *     responses:
 *       200:
 *         description: Todos os dias do mês com totais por dia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year:
 *                   type: integer
 *                 month:
 *                   type: integer
 *                 days:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CalendarDay'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     studiedDays:
 *                       type: integer
 *                     totalMinutes:
 *                       type: integer
 *                     totalSessions:
 *                       type: integer
 */
router.get("/calendar", dashboardController.calendar);

/**
 * @swagger
 * /dashboard/subjects-ranking:
 *   get:
 *     summary: Ranking de disciplinas por minutos estudados
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Início do período (opcional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fim do período (opcional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista ordenada por total de minutos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubjectRanking'
 */
router.get("/subjects-ranking", dashboardController.subjectsRanking);

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Resumo geral de estudos
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Totais da semana, mês e histórico completo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 week:
 *                   $ref: '#/components/schemas/PeriodSummary'
 *                 month:
 *                   $ref: '#/components/schemas/PeriodSummary'
 *                 total:
 *                   type: object
 *                   properties:
 *                     totalMinutes:
 *                       type: integer
 *                     totalHours:
 *                       type: number
 *                     sessionCount:
 *                       type: integer
 */
router.get("/summary", dashboardController.summary);

export { router as dashboardRoutes };
