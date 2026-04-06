import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authRoutes } from "./modules/auth/auth.routes";
import { subjectsRoutes } from "./modules/subjects/subjects.routes";
import { studySessionsRoutes } from "./modules/study-sessions/studySessions.routes";
import path from "path";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// rotas entram aqui depois
app.use("/auth", authRoutes);
app.use("/subjects", subjectsRoutes);
app.use("/study-sessions", studySessionsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (req, res) => res.json(swaggerSpec));

app.use(errorMiddleware);

export { app };
