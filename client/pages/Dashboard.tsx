import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const items = [
  { icon: "🎯", label: "Quiz", href: "/quiz" },
  { icon: "💼", label: "Career Recommendations", href: "/recommendations" },
  { icon: "👔", label: "Interview Prep", href: "/interview" },
  { icon: "⚙️", label: "Settings", href: "/settings" },
  { icon: "📊", label: "Insights", href: "/analytics" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <Link key={it.href} to={it.href} aria-label={it.label}>
            <Card className="h-full border-indigo-100 transition hover:shadow-lg hover:border-indigo-200 dark:border-indigo-900/40 dark:hover:border-indigo-800/60">
              <CardContent className="flex items-center gap-4 p-6">
                <span className="text-3xl" aria-hidden>
                  {it.icon}
                </span>
                <span className="text-base font-medium">{it.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
