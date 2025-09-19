import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  ChartBar,
  FileText,
  MapPin,
  LogIn,
  GraduationCap,
  Target,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "@shared/quiz";

export default function Index() {
  const navigate = useNavigate();
  const [answersCount, setAnswersCount] = useState(0);
  const [topRec, setTopRec] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawA = localStorage.getItem("nsn.quiz.answers.v1");
      if (rawA) {
        const a = JSON.parse(rawA) as Record<string, unknown>;
        setAnswersCount(Object.keys(a).length);
      }
      const rawR = localStorage.getItem("nsn.quiz.result.v1");
      if (rawR) {
        const r = JSON.parse(rawR) as { recommendations?: { title: string }[] };
        setTopRec(r.recommendations?.[0]?.title ?? null);
      }
    } catch {}
  }, []);

  const totalQ = QUESTIONS.length;
  const progress = Math.max(
    0,
    Math.min(100, Math.round((answersCount / Math.max(1, totalQ)) * 100)),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-teal-50 to-white px-6 py-10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="container grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200 backdrop-blur dark:bg-slate-800/70 dark:text-sky-200 dark:ring-sky-900/40">
            Your One-Stop Personalized Career & Education Advisor
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Take a quiz, discover your strengths, and unlock a roadmap to your
            dream career.
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button onClick={() => navigate("/quiz")}>
              Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Start Your Journey
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-sky-400/30 to-teal-400/30 blur-2xl" />
          <Card className="relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Progress</p>
                {topRec ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/recommendations")}
                  >
                    View Recommendations
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/quiz")}
                  >
                    Resume Quiz
                  </Button>
                )}
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {progress}% Complete
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quiz + Roadmap Preview */}
      <section className="container mt-14 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">
              Complete the quiz to get your customized career roadmap.
            </h3>
            <div className="mt-4 grid gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-full overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className={`h-full rounded-full bg-sky-500`}
                    style={{ width: `${(i + 1) * 25}%` }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Roadmap Preview</h3>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-medium">
              <span className="rounded-md bg-secondary px-2 py-1">
                Class 10
              </span>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="rounded-md bg-secondary px-2 py-1">
                Class 12
              </span>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="rounded-md bg-secondary px-2 py-1">College</span>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="rounded-md bg-secondary px-2 py-1">Career</span>
            </div>
            <div className="mt-4 rounded-lg border p-4">
              <p className="font-semibold">
                {topRec ?? "Complete the quiz to unlock your top career"}
              </p>
              <p className="text-sm text-muted-foreground">
                {topRec
                  ? "Top suggested career from your quiz results"
                  : "We’ll tailor this based on your answers"}
              </p>
              <div className="mt-3">
                {topRec ? (
                  <Button
                    size="sm"
                    onClick={() => navigate("/recommendations")}
                  >
                    View details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/quiz")}
                  >
                    Take the Quiz
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="container mt-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <BriefcaseBusiness className="h-5 w-5" />,
              title: "Career Recommendations",
              to: "/recommendations",
            },
            {
              icon: <CalendarDays className="h-5 w-5" />,
              title: "Deadlines & Alerts",
              to: "/deadlines",
            },
            {
              icon: <FileText className="h-5 w-5" />,
              title: "Resume Builder",
              to: "/resume",
            },
            {
              icon: <Target className="h-5 w-5" />,
              title: "Roadmaps",
              to: "/roadmap",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Opportunities Hub",
              to: "/opportunities",
            },
            {
              icon: <GraduationCap className="h-5 w-5" />,
              title: "Colleges",
              to: "/colleges",
            },
            {
              icon: <ChartBar className="h-5 w-5" />,
              title: "Insights",
              to: "/analytics",
            },
            {
              icon: <Brain className="h-5 w-5" />,
              title: "AI Chatbot",
              to: "/chatbot",
            },
            {
              icon: <LogIn className="h-5 w-5" />,
              title: "Login",
              to: "/login",
            },
          ].map((f) => (
            <Link key={f.title} to={f.to} aria-label={f.title}>
              <Card className="transition hover:shadow-lg">
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-sky-500 to-teal-500 text-white">
                    {f.icon}
                  </div>
                  <p className="font-medium">{f.title}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="container mt-16 rounded-2xl border bg-gradient-to-r from-sky-50 to-teal-50 p-8 text-center dark:from-slate-800 dark:to-slate-800">
        <h3 className="text-xl font-semibold">
          Ready to take the first step toward your future?
        </h3>
        <Button
          className="mt-4"
          variant="default"
          onClick={() => navigate("/login")}
        >
          Start Your Journey
        </Button>
      </section>
    </div>
  );
}
