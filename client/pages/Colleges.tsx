import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Ownership = "Government" | "Govt-Aided" | "Private";

interface College {
  id: string;
  name: string;
  state: string;
  city: string;
  ownership: Ownership;
}

const STATES: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  Delhi: ["New Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Varanasi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  Telangana: ["Hyderabad", "Warangal"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
};

const OWNERSHIPS: Ownership[] = ["Government", "Govt-Aided", "Private"];

function generateColleges(): College[] {
  const kinds = [
    "Institute of Technology",
    "College of Engineering",
    "University",
    "Institute of Science",
    "Polytechnic",
    "Management Institute",
  ];
  const result: College[] = [];
  let idx = 1;
  for (const [state, cities] of Object.entries(STATES)) {
    for (const city of cities) {
      for (let i = 0; i < 25; i++) {
        // ~25 per city
        const kind = kinds[(i + city.length) % kinds.length];
        const ownership = OWNERSHIPS[(i + idx) % OWNERSHIPS.length];
        result.push({
          id: `c_${idx++}`,
          name: `${city} ${kind} ${i + 1}`,
          state,
          city,
          ownership,
        });
      }
    }
  }
  return result; // ~600+ entries
}

const ALL_COLLEGES = generateColleges();

export default function Colleges() {
  const [q, setQ] = useState("");
  const [state, setState] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [own, setOwn] = useState<"all" | Ownership>("all");
  const [page, setPage] = useState(1);
  const pageSize = 24;

  useEffect(() => {
    setCity("all");
    setPage(1);
  }, [state]);
  useEffect(() => {
    setPage(1);
  }, [q, own, city]);

  const citiesForState = useMemo(
    () => (state === "all" ? [] : (STATES[state] ?? [])),
    [state],
  );

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return ALL_COLLEGES.filter(
      (c) =>
        (ql === "" ||
          `${c.name} ${c.city} ${c.state}`.toLowerCase().includes(ql)) &&
        (state === "all" || c.state === state) &&
        (city === "all" || c.city === city) &&
        (own === "all" || c.ownership === own),
    );
  }, [q, state, city, own]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Colleges</h1>
          <p className="text-sm text-muted-foreground">
            Browse {ALL_COLLEGES.length}+ colleges. Filter by state, city, and
            ownership.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="Search college or city"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {Object.keys(STATES).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={city}
            onValueChange={setCity}
            disabled={state === "all"}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {citiesForState.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={own} onValueChange={(v) => setOwn(v as any)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Ownership" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {OWNERSHIPS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pageData.map((c) => (
          <Card key={c.id} className="transition hover:shadow-lg">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{c.name}</h3>
                <Badge variant="secondary">{c.ownership}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {c.city}, {c.state}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(page - 1) * pageSize + 1}-
          {Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
