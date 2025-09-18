import { RequestHandler } from "express";
import { ResumeSaveRequest, ResumeSaveResponse } from "../../shared/resume";

export const saveResume: RequestHandler = (req, res) => {
  const body = req.body as ResumeSaveRequest | undefined;
  if (!body || !body.resume)
    return res.status(400).json({ error: "Invalid payload" });
  const id = `res_${Date.now()}`;
  const response: ResumeSaveResponse = { id, ok: true };
  return res.status(200).json(response);
};
