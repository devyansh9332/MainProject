import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface Internship {
  id: string;
  role: string;
  company: string;
  location: string;
  type: "Remote" | "On-site" | "Hybrid";
  stipend: string;
  applyBy: string; // ISO date
  category:
    | "software"
    | "data-science"
    | "design"
    | "marketing"
    | "content"
    | "finance"
    | "hr"
    | "remote";
}

const LIST: Internship[] = [
  {
    id: "se_1",
    role: "Software Engineer Intern",
    company: "Acme Tech",
    location: "Bengaluru",
    type: "Hybrid",
    stipend: "₹25,000 / mo",
    applyBy: "2025-10-01",
    category: "software",
  },
  {
    id: "se_2",
    role: "Frontend Developer Intern",
    company: "Nimbus Web",
    location: "Remote",
    type: "Remote",
    stipend: "₹20,000 / mo",
    applyBy: "2025-09-28",
    category: "software",
  },
  {
    id: "ds_1",
    role: "Data Science Intern",
    company: "Insight Labs",
    location: "Pune",
    type: "On-site",
    stipend: "₹22,000 / mo",
    applyBy: "2025-10-10",
    category: "data-science",
  },
  {
    id: "ds_2",
    role: "ML Engineer Intern",
    company: "VisionAI",
    location: "Remote",
    type: "Remote",
    stipend: "₹30,000 / mo",
    applyBy: "2025-10-05",
    category: "data-science",
  },
  {
    id: "ux_1",
    role: "UI/UX Designer Intern",
    company: "Pixel Forge",
    location: "Gurugram",
    type: "Hybrid",
    stipend: "₹18,000 / mo",
    applyBy: "2025-09-30",
    category: "design",
  },
  {
    id: "ux_2",
    role: "Product Design Intern",
    company: "Flow Studio",
    location: "Remote",
    type: "Remote",
    stipend: "₹15,000 / mo",
    applyBy: "2025-10-08",
    category: "design",
  },
  {
    id: "mk_1",
    role: "Digital Marketing Intern",
    company: "GrowthHub",
    location: "Mumbai",
    type: "On-site",
    stipend: "₹12,000 / mo",
    applyBy: "2025-10-02",
    category: "marketing",
  },
  {
    id: "mk_2",
    role: "SEO Intern",
    company: "RankRight",
    location: "Remote",
    type: "Remote",
    stipend: "₹10,000 / mo",
    applyBy: "2025-10-12",
    category: "marketing",
  },
  {
    id: "ct_1",
    role: "Content Writing Intern",
    company: "WriteWise",
    location: "Remote",
    type: "Remote",
    stipend: "₹8,000 / mo",
    applyBy: "2025-09-29",
    category: "content",
  },
  {
    id: "ct_2",
    role: "Technical Content Intern",
    company: "DocuCraft",
    location: "Hyderabad",
    type: "On-site",
    stipend: "₹14,000 / mo",
    applyBy: "2025-10-06",
    category: "content",
  },
  {
    id: "fn_1",
    role: "Finance Analyst Intern",
    company: "LedgerX",
    location: "Delhi NCR",
    type: "Hybrid",
    stipend: "₹20,000 / mo",
    applyBy: "2025-10-04",
    category: "finance",
  },
  {
    id: "fn_2",
    role: "Accounting Intern",
    company: "BalanceCo",
    location: "Chennai",
    type: "On-site",
    stipend: "₹12,000 / mo",
    applyBy: "2025-10-09",
    category: "finance",
  },
  {
    id: "hr_1",
    role: "HR Operations Intern",
    company: "PeopleFirst",
    location: "Remote",
    type: "Remote",
    stipend: "₹9,000 / mo",
    applyBy: "2025-10-03",
    category: "hr",
  },
  {
    id: "hr_2",
    role: "Talent Acquisition Intern",
    company: "HireMate",
    location: "Bengaluru",
    type: "On-site",
    stipend: "₹11,000 / mo",
    applyBy: "2025-10-07",
    category: "hr",
  },
  {
    id: "rm_1",
    role: "Remote SWE Intern",
    company: "CloudShip",
    location: "Remote",
    type: "Remote",
    stipend: "₹26,000 / mo",
    applyBy: "2025-10-11",
    category: "remote",
  },
  {
    id: "rm_2",
    role: "Remote Data Analyst Intern",
    company: "Datapath",
    location: "Remote",
    type: "Remote",
    stipend: "₹22,000 / mo",
    applyBy: "2025-10-13",
    category: "remote",
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "software", label: "Software" },
  { value: "data-science", label: "Data Science" },
  { value: "design", label: "Design / UI" },
  { value: "marketing", label: "Marketing" },
  { value: "content", label: "Content" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "HR" },
  { value: "remote", label: "Remote Only" },
] as const;

export default function Internships() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]["value"]>("all");

  const data = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return LIST.filter(
      (it) =>
        (cat === "all" || it.category === cat) &&
        (ql === "" ||
          `${it.role} ${it.company} ${it.location}`.toLowerCase().includes(ql)),
    );
  }, [q, cat]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Internship Board</h1>
          <p className="text-sm text-muted-foreground">
            Curated openings across domains with apply-by dates.
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search role, company, or location"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((it) => (
          <Card key={it.id} className="transition hover:shadow-lg">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{it.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {it.company} • {it.location}
                  </p>
                </div>
                <Badge variant="secondary">{it.type}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stipend</span>
                <span className="font-medium">{it.stipend}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Apply by</span>
                <span className="font-medium">
                  {new Date(it.applyBy).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Button asChild size="sm">
                  <Link to={`/internships/${it.category}`}>View similar</Link>
                </Button>
                <Button size="sm" variant="outline" disabled>
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No internships match your filters.
        </p>
      )}
    </div>
  );
}
