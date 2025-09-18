import type { QuizAnswers, QuizSubmitResponse } from "@shared/quiz";
import type { ResumeData, ResumeSaveResponse } from "@shared/resume";
import type { InterviewPrepData, InterviewSaveResponse } from "@shared/interview";

const BASE = ""; // same origin

export async function submitQuiz(answers: QuizAnswers): Promise<QuizSubmitResponse> {
  const res = await fetch(`${BASE}/api/quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return (await res.json()) as QuizSubmitResponse;
}

export async function saveResume(resume: ResumeData): Promise<ResumeSaveResponse> {
  const res = await fetch(`${BASE}/api/resume/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as ResumeSaveResponse;
}

export async function saveInterview(data: InterviewPrepData): Promise<InterviewSaveResponse> {
  const res = await fetch(`${BASE}/api/interview/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as InterviewSaveResponse;
}
