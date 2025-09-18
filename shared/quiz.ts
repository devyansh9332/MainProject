export type Trait = "analytical" | "creative" | "social" | "practical";

export interface QuizQuestion {
  id: string;
  prompt: string;
  trait: Trait;
}

export type Likert = 1 | 2 | 3 | 4 | 5;

export type QuizAnswers = Record<string, Likert>;

export interface TraitScores {
  analytical: number;
  creative: number;
  social: number;
  practical: number;
}

export interface Career {
  id: string;
  title: string;
  summary: string;
  weights: Partial<Record<Trait, number>>;
}

export interface Recommendation {
  id: string;
  careerId: string;
  title: string;
  score: number;
  summary: string;
  reasons: string[];
  nextSteps: string[];
}

export interface QuizSubmitRequest {
  answers: QuizAnswers;
}

export interface QuizSubmitResponse {
  traits: TraitScores;
  recommendations: Recommendation[];
}

// A concise, realistic question bank. Each question maps primarily to one trait.
export const QUESTIONS: QuizQuestion[] = [
  { id: "q1", prompt: "I enjoy solving math or logic puzzles.", trait: "analytical" },
  { id: "q2", prompt: "I like planning how to approach complex problems step-by-step.", trait: "analytical" },
  { id: "q3", prompt: "Designing posters, interfaces, or visuals sounds exciting.", trait: "creative" },
  { id: "q4", prompt: "I enjoy writing stories, scripts, or blog posts.", trait: "creative" },
  { id: "q5", prompt: "I feel energized when collaborating or helping others learn.", trait: "social" },
  { id: "q6", prompt: "I’m comfortable presenting ideas to a group.", trait: "social" },
  { id: "q7", prompt: "I like fixing gadgets or building hands‑on projects.", trait: "practical" },
  { id: "q8", prompt: "I prefer tasks where I can see and measure real‑world results.", trait: "practical" },
  { id: "q9", prompt: "I enjoy experimenting and learning new tools or technologies.", trait: "analytical" },
];

export const CAREERS: Career[] = [
  {
    id: "software_engineer",
    title: "Software Engineer",
    summary: "Build and ship reliable software systems across web, mobile, or data platforms.",
    weights: { analytical: 0.6, practical: 0.2, creative: 0.15 },
  },
  {
    id: "data_analyst",
    title: "Data Analyst",
    summary: "Turn raw data into insights to inform product and business decisions.",
    weights: { analytical: 0.7, practical: 0.15 },
  },
  {
    id: "ui_ux_designer",
    title: "UI/UX Designer",
    summary: "Design intuitive, accessible, and delightful user experiences.",
    weights: { creative: 0.6, analytical: 0.2, social: 0.15 },
  },
  {
    id: "teacher_trainer",
    title: "Teacher / Trainer",
    summary: "Help learners grow through instruction, mentorship, and feedback.",
    weights: { social: 0.6, analytical: 0.15, creative: 0.15 },
  },
  {
    id: "mechanical_engineer",
    title: "Mechanical Engineer",
    summary: "Design and test mechanical systems, devices, and processes.",
    weights: { practical: 0.6, analytical: 0.25 },
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    summary: "Start and grow ventures by combining strategy, product, and leadership.",
    weights: { social: 0.3, creative: 0.35, analytical: 0.25 },
  },
];

export function emptyTraitScores(): TraitScores {
  return { analytical: 0, creative: 0, social: 0, practical: 0 };
}

export function scoreTraits(answers: QuizAnswers): TraitScores {
  const scores = emptyTraitScores();
  // Map 1..5 to 0..4 for additive scoring
  const map = (v: Likert) => v - 1;
  for (const q of QUESTIONS) {
    const v = answers[q.id];
    if (!v) continue;
    const inc = map(v);
    scores[q.trait] += inc;
  }
  return scores;
}

export function scoreCareers(traits: TraitScores): Recommendation[] {
  const recs: Recommendation[] = CAREERS.map((c) => {
    let score = 0;
    for (const [trait, weight] of Object.entries(c.weights)) {
      const t = trait as Trait;
      score += (traits[t] ?? 0) * (weight ?? 0);
    }
    const reasons: string[] = Object.entries(c.weights)
      .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
      .slice(0, 2)
      .map(([trait]) =>
        trait === "analytical"
          ? "Strong analytical problem‑solving"
          : trait === "creative"
            ? "Creativity and visual thinking"
            : trait === "social"
              ? "Communication and collaboration"
              : "Hands‑on, practical orientation",
      );

    const nextSteps: string[] = [
      "Take an introductory online course in the field",
      "Build a small, focused portfolio project",
      "Talk to a professional for a 20‑minute informational interview",
    ];

    return {
      id: `${c.id}_rec`,
      careerId: c.id,
      title: c.title,
      score,
      summary: c.summary,
      reasons,
      nextSteps,
    };
  });

  return recs
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
