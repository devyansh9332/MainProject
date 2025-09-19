import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

interface Item {
  id: string;
  title: string;
  tag: string;
  type:
    | "scholarship"
    | "hackathon"
    | "workshop"
    | "club"
    | "event"
    | "competition";
  date?: string;
  link?: string;
}

const items: Item[] = [
  {
    id: "sch_1",
    title: "National STEM Scholarship",
    tag: "Scholarship",
    type: "scholarship",
    date: "2025-10-12",
  },
  {
    id: "sch_2",
    title: "Women in Tech Grant",
    tag: "Scholarship",
    type: "scholarship",
    date: "2025-11-01",
  },
  {
    id: "hk_1",
    title: "AI for Good Hackathon",
    tag: "Hackathon",
    type: "hackathon",
    date: "2025-10-05",
  },
  {
    id: "hk_2",
    title: "Web3 Builders Weekend",
    tag: "Hackathon",
    type: "hackathon",
    date: "2025-10-18",
  },
  {
    id: "ws_1",
    title: "Resume & LinkedIn Workshop",
    tag: "Workshop",
    type: "workshop",
    date: "2025-09-30",
  },
  {
    id: "ws_2",
    title: "Interview Mock Drills",
    tag: "Workshop",
    type: "workshop",
    date: "2025-10-07",
  },
  { id: "cl_1", title: "Coding Club (Local)", tag: "Club", type: "club" },
  { id: "cl_2", title: "Design Circle (Remote)", tag: "Club", type: "club" },
  {
    id: "ev_1",
    title: "Tech Career Fair",
    tag: "Event",
    type: "event",
    date: "2025-10-20",
  },
  {
    id: "cp_1",
    title: "Data Challenge League",
    tag: "Competition",
    type: "competition",
    date: "2025-11-10",
  },
];

export default function Opportunities() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | Item["type"]>("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("type") as Item["type"] | null;
    if (t && ["scholarship","hackathon","workshop","club","event","competition"].includes(t)) setType(t);
  }, []);

  const data = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return items.filter((i) =>
      (ql === "" || i.title.toLowerCase().includes(ql)) &&
      (type === "all" || i.type === type)
    );
  }, [q, type]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Opportunities Hub</h1>
          <p className="text-sm text-muted-foreground">
            Scholarships, hackathons, workshops, clubs, events, and
            competitions.
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            className="max-w-sm"
            placeholder="Search opportunities"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Select value={type} onValueChange={(v)=> setType(v as any)}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="scholarship">Scholarship</SelectItem>
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="club">Club</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="competition">Competition</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((i) => (
          <Card key={i.id} className="transition hover:shadow-lg">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{i.title}</h3>
                <Badge variant="secondary">{i.tag}</Badge>
              </div>
              {i.date && (
                <div className="text-xs text-muted-foreground">
                  Date: {new Date(i.date).toLocaleDateString()}
                </div>
              )}
              {i.link && (
                <a
                  className="text-xs text-sky-700"
                  href={i.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No opportunities match your search.
        </p>
      )}
    </div>
  );
}
