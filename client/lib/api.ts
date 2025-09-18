import type { QuizAnswers, QuizSubmitResponse } from "@shared/quiz";

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
