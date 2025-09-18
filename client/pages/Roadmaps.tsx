import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DATA = [
  {
    id: "se",
    title: "Software Engineer",
    steps: [
      "Learn Programming Fundamentals (3–6 months)",
      "Data Structures & Algorithms (3–4 months)",
      "Web Basics: HTML/CSS/JS (1–2 months)",
      "Frontend/Backend Framework (2–4 months)",
      "Build 3–5 Projects + GitHub",
      "Internship / Open Source Contributions",
      "System Design Basics + Interview Prep",
    ],
  },
  {
    id: "ds",
    title: "Data Analyst",
    steps: [
      "Excel/Spreadsheets & SQL",
      "Statistics & Visualization (Tableau/PowerBI)",
      "Python: Pandas/NumPy",
      "Data Cleaning & EDA Projects",
      "Domain Case Studies",
      "Portfolio + Internship",
    ],
  },
  {
    id: "ux",
    title: "UI/UX Designer",
    steps: [
      "Design Principles & Visual Hierarchy",
      "Figma Basics + Components",
      "User Research & Wireframing",
      "Prototyping & Usability Testing",
      "Accessibility & Hand‑off",
      "Case Study Portfolio + Internship",
    ],
  },
];

export default function Roadmaps() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Career Roadmaps</h1>
        <p className="text-sm text-muted-foreground">Clear, actionable steps to reach your target role.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {DATA.map((r) => (
          <Card key={r.id} className="transition hover:shadow-sm">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <Separator />
              <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                {r.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
