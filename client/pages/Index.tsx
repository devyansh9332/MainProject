import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, BriefcaseBusiness, CalendarDays, ChartBar, FileText, MapPin, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Index() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-teal-50 to-white px-6 py-10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="container grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200 backdrop-blur dark:bg-slate-800/70 dark:text-sky-200 dark:ring-sky-900/40">Your One-Stop Personalized Career & Education Advisor</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Take a quiz, discover your strengths, and unlock a roadmap to your dream career.
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button onClick={() => navigate("/quiz")}>
              Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/login")}>Start Your Journey</Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-sky-400/30 to-teal-400/30 blur-2xl" />
          <Card className="relative">
            <CardContent className="p-6">
              <p className="text-sm font-medium">Progress</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[30%] animate-[progress_2s_ease-in-out_infinite_alternate] rounded-full bg-gradient-to-r from-sky-500 to-teal-500" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">30% Complete</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quiz + Roadmap Preview */}
      <section className="container mt-14 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Complete the quiz to get your customized career roadmap.</h3>
            <div className="mt-4 grid gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full bg-sky-500`} style={{ width: `${(i + 1) * 25}%` }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Roadmap Preview</h3>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-medium">
              <span className="rounded-md bg-secondary px-2 py-1">Class 10</span>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="rounded-md bg-secondary px-2 py-1">Class 12</span>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="rounded-md bg-secondary px-2 py-1">College</span>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="rounded-md bg-secondary px-2 py-1">Career</span>
            </div>
            <div className="mt-4 rounded-lg border p-4">
              <p className="font-semibold">Software Engineer</p>
              <p className="text-sm text-muted-foreground">Skills Needed: Coding, Problem-Solving, Communication</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="container mt-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <BriefcaseBusiness className="h-5 w-5" />, title: "Career Recommendations" },
            { icon: <CalendarDays className="h-5 w-5" />, title: "Deadlines & Alerts" },
            { icon: <FileText className="h-5 w-5" />, title: "Resume & Interview Prep" },
            { icon: <MapPin className="h-5 w-5" />, title: "Local Opportunities" },
            { icon: <ChartBar className="h-5 w-5" />, title: "Insights" },
            { icon: <Brain className="h-5 w-5" />, title: "AI Chatbot" },
          ].map((f) => (
            <Card key={f.title} className="transition hover:shadow-lg">
              <CardContent className="flex items-center gap-3 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-sky-500 to-teal-500 text-white">
                  {f.icon}
                </div>
                <p className="font-medium">{f.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="container mt-16 rounded-2xl border bg-gradient-to-r from-sky-50 to-teal-50 p-8 text-center dark:from-slate-800 dark:to-slate-800">
        <h3 className="text-xl font-semibold">Ready to take the first step toward your future?</h3>
        <Button className="mt-4" variant="default" onClick={() => navigate("/login")}>Start Your Journey</Button>
      </section>

      {/* Floating Chatbot */}
      <button
        aria-label="Open AI Chatbot"
        onClick={() => setChatOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 to-teal-500 text-white shadow-lg"
      >
        <MessageSquare className="h-5 w-5" />
      </button>
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="border-b p-3 font-semibold">CareerBuddy AI</div>
          <div className="h-48 space-y-2 overflow-auto p-3 text-sm">
            <div className="rounded-md bg-secondary p-2">Ask career questions and get guidance.</div>
          </div>
          <div className="flex gap-2 border-t p-3">
            <input className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none" placeholder="Type here…" />
            <Button size="sm">Send</Button>
          </div>
        </div>
      )}

      <style>{`@keyframes progress{from{width:10%} to{width:80%}}`}</style>
    </div>
  );
}
