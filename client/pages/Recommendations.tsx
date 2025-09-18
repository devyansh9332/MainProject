import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import type { QuizSubmitResponse, Recommendation } from "@shared/quiz";

const RESULT_KEY = "nsn.quiz.result.v1";

export default function Recommendations() {
  const navigate = useNavigate();
  const [data, setData] = useState<QuizSubmitResponse | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESULT_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  const items: Recommendation[] = useMemo(
    () => (data?.recommendations ?? []).slice(0, 3),
    [data],
  );

  if (!data || items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Suggested Careers</h1>
        <p className="text-muted-foreground">
          Take the quiz to view tailored recommendations.
        </p>
        <Button onClick={() => navigate("/quiz")}>Take the Quiz</Button>
      </div>
    );
  }

  const totalTrait = Object.values(data.traits).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Suggested Careers</h1>
          <p className="text-sm text-muted-foreground">
            Based on your answers, here are strong fits.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/quiz")}>
          Retake Quiz
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((rec) => {
          const pct = Math.min(
            100,
            Math.round((rec.score / items[0].score) * 100),
          );
          return (
            <Card key={rec.id} className="transition hover:shadow-lg">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{rec.title}</h3>
                  <Badge variant="secondary">Fit: {pct}%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.summary}</p>
                <Progress value={pct} />
                <div>
                  <p className="text-sm font-medium">Why this matches you</p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground">
                    {rec.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">Next Steps</p>
                  <ol className="mt-1 list-decimal pl-5 text-sm text-muted-foreground">
                    {rec.nextSteps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-5 space-y-2">
          <p className="text-sm font-medium">Your Trait Profile</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(data.traits).map(([k, v]) => {
              const pct = Math.round(((v as number) / totalTrait) * 100);
              return (
                <div key={k} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <span className="capitalize text-sm">{k}</span>
                    <span className="text-xs text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                  <Progress className="mt-2" value={pct} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
