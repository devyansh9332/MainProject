import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const items = [
  { icon: "🎯", label: "Career Quiz", href: "/quiz", badge: "30%" },
  {
    icon: "💼",
    label: "Career Recommendations",
    href: "/recommendations",
    badge: "3",
  },
  { icon: "🗺️", label: "Roadmap", href: "/roadmap" },
  { icon: "📅", label: "Deadlines & Alerts", href: "/deadlines", badge: "2" },
  { icon: "🏫", label: "Local Opportunities", href: "/opportunities" },
  { icon: "💻", label: "Internships & Volunteer", href: "/internships" },
  { icon: "📝", label: "Resume Builder", href: "/resume" },
  { icon: "👔", label: "Interview Prep", href: "/interview" },
  { icon: "📊", label: "Insights", href: "/analytics" },
  { icon: "⚙️", label: "Settings", href: "/settings" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border bg-gradient-to-r from-sky-50 to-teal-50 p-5 dark:from-slate-800 dark:to-slate-800">
        <div className="text-sm font-medium">Gamification</div>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold">You've completed 60% of your roadmap!</p>
          <div className="h-2 w-40 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-sky-500 to-teal-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <Link key={it.href} to={it.href} aria-label={it.label}>
            <Card className="relative h-full border-indigo-100 transition hover:shadow-lg hover:border-indigo-200 dark:border-indigo-900/40 dark:hover:border-indigo-800/60">
              {it.badge && (
                <span className="absolute right-3 top-3 rounded-full bg-sky-600 px-2 py-0.5 text-xs font-medium text-white">
                  {it.badge}
                </span>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl" aria-hidden>
                    {it.icon}
                  </span>
                  <span className="text-base font-medium">{it.label}</span>
                </div>
                {it.label === "Career Quiz" && (
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[30%] rounded-full bg-sky-500" />
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
