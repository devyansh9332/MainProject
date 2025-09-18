import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import QuestionItem from "@/components/quiz/QuestionItem";
import { submitQuiz } from "@/lib/api";
import type { Likert, QuizAnswers } from "@shared/quiz";
import { QUESTIONS } from "@shared/quiz";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

const STORAGE_KEY = "nsn.quiz.answers.v1";
const RESULT_KEY = "nsn.quiz.result.v1";

export default function Quiz() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [page, setPage] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const total = QUESTIONS.length;
  const completed = Object.keys(answers).length;
  const progress = Math.round((completed / total) * 100);

  const paged = useMemo(() => {
    const start = page * pageSize;
    const end = Math.min(start + pageSize, QUESTIONS.length);
    return QUESTIONS.slice(start, end);
  }, [page]);

  const canPrev = page > 0;
  const canNext = (page + 1) * pageSize < QUESTIONS.length;
  const allAnswered = total > 0 && completed === total;

  const mutation = useMutation({
    mutationFn: () => submitQuiz(answers),
    onSuccess: (data) => {
      localStorage.setItem(RESULT_KEY, JSON.stringify(data));
      toast({ title: "Quiz submitted", description: "Recommendations ready." });
      navigate("/recommendations");
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Submission failed";
      toast({ title: "Error", description: message });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Career Assessment Quiz</h1>
          <p className="text-sm text-muted-foreground">
            Answer honestly to get better recommendations.
          </p>
        </div>
        <div className="w-48">
          <Progress value={progress} />
          <p className="mt-1 text-xs text-muted-foreground text-right">
            {progress}%
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          {paged.map((q, idx) => (
            <QuestionItem
              key={q.id}
              index={page * pageSize + idx}
              question={q}
              value={answers[q.id] as Likert}
              onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
            />
          ))}

          <Separator />

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={!canPrev}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {canNext ? (
              <Button onClick={() => setPage((p) => p + 1)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => mutation.mutate()}
                disabled={!allAnswered || mutation.isPending}
              >
                Submit <Send className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            setAnswers({});
            setPage(0);
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(RESULT_KEY);
            toast({ title: "Cleared", description: "Quiz progress reset." });
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
