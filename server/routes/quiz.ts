import { RequestHandler } from "express";
import {
  QuizSubmitRequest,
  QuizSubmitResponse,
  scoreTraits,
  scoreCareers,
} from "@shared/quiz";

export const submitQuiz: RequestHandler = (req, res) => {
  const body = req.body as QuizSubmitRequest | undefined;
  if (!body || !body.answers || typeof body.answers !== "object") {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const traits = scoreTraits(body.answers);
  const recommendations = scoreCareers(traits);
  const response: QuizSubmitResponse = { traits, recommendations };
  return res.status(200).json(response);
};
