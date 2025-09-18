import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { submitQuiz } from "./routes/quiz";
import { saveResume } from "./routes/resume";
import { saveInterview } from "./routes/interview";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Quiz routes
  app.post("/api/quiz/submit", submitQuiz);

  // Resume & Interview routes
  app.post("/api/resume/save", saveResume);
  app.post("/api/interview/save", saveInterview);

  return app;
}
