import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Career Quiz", to: "/quiz" },
  { label: "Career Recommendations", to: "/recommendations" },
  { label: "Roadmap", to: "/roadmap" },
  { label: "Deadlines & Alerts", to: "/deadlines" },
  { label: "Opportunities Hub", to: "/opportunities" },
  { label: "Internship Board", to: "/internships" },
  { label: "Resume & Interview Prep", to: "/resume" },
  { label: "Insights / Reports", to: "/analytics" },
  { label: "About Us", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact Us", to: "/contact" },
  { label: "Support / FAQ", to: "/faq" },
  { label: "Settings", to: "/settings" },
];

const deadlinesMenu = [
  { label: "Entrance Exams", to: "/deadlines/exams" },
  { label: "Scholarship Deadlines", to: "/deadlines/scholarships" },
  { label: "College Applications", to: "/deadlines/college-applications" },
  { label: "Counselling Rounds", to: "/deadlines/counselling" },
  { label: "Result Announcements", to: "/deadlines/results" },
  { label: "Admit Cards", to: "/deadlines/admit-cards" },
  { label: "Fee Payments", to: "/deadlines/fee-payments" },
  { label: "Calendar View", to: "/deadlines/calendar" },
];

const internshipsMenu = [
  { label: "Software Engineering", to: "/internships/software" },
  { label: "Data Science", to: "/internships/data-science" },
  { label: "Design / UI", to: "/internships/design" },
  { label: "Marketing", to: "/internships/marketing" },
  { label: "Content Writing", to: "/internships/content" },
  { label: "Finance", to: "/internships/finance" },
  { label: "Human Resources", to: "/internships/hr" },
  { label: "Remote Only", to: "/internships/remote" },
];

export default function NavMenu() {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetTitle className="sr-only">Main navigation</SheetTitle>
        <div className="flex items-center gap-3 border-b p-4">
          <Avatar>
            <AvatarFallback>NS</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="font-medium">NextStepNavigators</div>
            <div className="text-xs text-muted-foreground">Welcome!</div>
          </div>
        </div>
        <nav className="grid gap-1 p-3">
          {navItems.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="rounded-md px-3 py-2 text-sm hover:bg-sky-100 hover:text-sky-800 dark:hover:bg-sky-900/40 dark:hover:text-sky-100"
            >
              {it.label}
            </Link>
          ))}

          <div className="mt-3 px-3 pt-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Deadlines & Alerts
          </div>
          {deadlinesMenu.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sky-100 hover:text-sky-800 dark:hover:bg-sky-900/40 dark:hover:text-sky-100"
            >
              {it.label}
            </Link>
          ))}

          <div className="mt-3 px-3 pt-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Internship Board
          </div>
          {internshipsMenu.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sky-100 hover:text-sky-800 dark:hover:bg-sky-900/40 dark:hover:text-sky-100"
            >
              {it.label}
            </Link>
          ))}

          <Button
            variant="destructive"
            className="mt-3"
            onClick={() => navigate("/login")}
          >
            Logout
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
