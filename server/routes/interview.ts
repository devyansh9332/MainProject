import { RequestHandler } from "express";
import { InterviewSaveRequest, InterviewSaveResponse } from "../../shared/interview";

export const saveInterview: RequestHandler = (req, res) => {
  const body = req.body as InterviewSaveRequest | undefined;
  if (!body || !body.data) return res.status(400).json({ error: "Invalid payload" });
  const id = `int_${Date.now()}`;
  const response: InterviewSaveResponse = { id, ok: true };
  return res.status(200).json(response);
};
