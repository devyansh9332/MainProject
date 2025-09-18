import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface Deadline {
  id: string;
  title: string;
  date: string; // ISO date
  type:
    | "exam"
    | "scholarship"
    | "college-app"
    | "counselling"
    | "result"
    | "admit-card"
    | "fee"
    | "other";
}

const all: Deadline[] = [
  {
    id: "ex_1",
    title: "JEE Main Session 2 Registration Ends",
    date: "2025-10-01",
    type: "exam",
  },
  {
    id: "ex_2",
    title: "NEET 2025 Application Window Close",
    date: "2025-10-05",
    type: "exam",
  },
  {
    id: "sc_1",
    title: "National Merit Scholarship Last Date",
    date: "2025-09-30",
    type: "scholarship",
  },
  {
    id: "sc_2",
    title: "STEM Scholars Program Deadline",
    date: "2025-10-12",
    type: "scholarship",
  },
  {
    id: "cl_1",
    title: "DU UG Admission Round 1 Locking",
    date: "2025-10-03",
    type: "college-app",
  },
  {
    id: "cl_2",
    title: "VTU PG Application Close",
    date: "2025-10-08",
    type: "college-app",
  },
  {
    id: "co_1",
    title: "JOSAA Counselling Round 2 Choice Fill",
    date: "2025-10-04",
    type: "counselling",
  },
  {
    id: "co_2",
    title: "State CET Counselling Document Upload",
    date: "2025-10-06",
    type: "counselling",
  },
  {
    id: "rs_1",
    title: "GATE 2025 Results",
    date: "2025-10-15",
    type: "result",
  },
  { id: "rs_2", title: "CAT 2025 Results", date: "2025-10-18", type: "result" },
  {
    id: "ac_1",
    title: "JEE Advanced Admit Card Release",
    date: "2025-10-02",
    type: "admit-card",
  },
  {
    id: "ac_2",
    title: "NEET Admit Card Release",
    date: "2025-10-07",
    type: "admit-card",
  },
  {
    id: "fe_1",
    title: "Semester Fee Payment Deadline (DU UG)",
    date: "2025-10-10",
    type: "fee",
  },
  {
    id: "fe_2",
    title: "Hostel Fee Payment Last Date (VTU)",
    date: "2025-10-11",
    type: "fee",
  },
];

const sections: { key: Deadline["type"]; label: string; link: string }[] = [
  { key: "exam", label: "Entrance Exams", link: "/deadlines/exams" },
  {
    key: "scholarship",
    label: "Scholarships",
    link: "/deadlines/scholarships",
  },
  {
    key: "college-app",
    label: "College Applications",
    link: "/deadlines/college-applications",
  },
  {
    key: "counselling",
    label: "Counselling Rounds",
    link: "/deadlines/counselling",
  },
  { key: "result", label: "Results", link: "/deadlines/results" },
  { key: "admit-card", label: "Admit Cards", link: "/deadlines/admit-cards" },
  { key: "fee", label: "Fee Payments", link: "/deadlines/fee-payments" },
];

export default function Deadlines() {
  const [q, setQ] = useState("");

  const data = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return all.filter((d) => ql === "" || d.title.toLowerCase().includes(ql));
  }, [q]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deadlines & Alerts</h1>
          <p className="text-sm text-muted-foreground">
            Track important exam, scholarship, and application dates.
          </p>
        </div>
        <Input
          className="max-w-sm"
          placeholder="Search deadlines"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <Separator />

      {sections.map((s) => {
        const items = data.filter((d) => d.type === s.key).slice(0, 4);
        return (
          <Card key={s.key} className="transition hover:shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{s.label}</h3>
                <Link
                  to={s.link}
                  className="text-sm text-sky-700 hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="grid gap-2">
                {items.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between rounded-md border p-3 text-sm"
                  >
                    <span>{d.title}</span>
                    <Badge variant="secondary">
                      {new Date(d.date).toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
