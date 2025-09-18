export type Category = "common" | "behavioral" | "technical";

export interface QA {
  id: string;
  question: string;
  answer: string;
  done: boolean;
  category: Category;
}

export interface InterviewPrepData {
  qas: QA[];
}

export interface InterviewSaveRequest {
  data: InterviewPrepData;
}

export interface InterviewSaveResponse {
  id: string;
  ok: true;
}

export const COMMON_QUESTIONS: string[] = [
  "Tell me about yourself.",
  "Why do you want this role?",
  "What are your strengths?",
  "What are your weaknesses?",
  "Describe a challenge you faced and how you solved it.",
  "Where do you see yourself in 5 years?",
  "Why should we hire you?",
];

export const BEHAVIORAL_QUESTIONS: string[] = [
  "Tell me about a time you worked in a team.",
  "Describe a conflict and how you resolved it.",
  "Give an example of when you showed leadership.",
  "Tell me about a time you failed and what you learned.",
];

export const TECHNICAL_QUESTIONS: string[] = [
  "Explain a technical project you're proud of.",
  "How do you debug a complex issue?",
  "What is your approach to writing maintainable code?",
];
