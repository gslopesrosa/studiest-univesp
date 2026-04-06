import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authRoutes } from "./modules/auth/auth.routes";
import { subjectsRoutes } from "./modules/subjects/subjects.routes";
import { studySessionsRoutes } from "./modules/study-sessions/studySessions.routes";
import path from "path";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// rotas entram aqui depois
app.use("/auth", authRoutes);
app.use("/subjects", subjectsRoutes);
app.use("/study-sessions", studySessionsRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));

app.use(errorMiddleware);

export { app };
