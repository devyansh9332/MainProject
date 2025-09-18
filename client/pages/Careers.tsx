import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CAREERS } from "@shared/quiz";

export default function Careers() {
  const [q, setQ] = useState("");
  const data = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return CAREERS.filter(
      (c) => ql === "" || `${c.title} ${c.summary}`.toLowerCase().includes(ql),
    );
  }, [q]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Careers Directory</h1>
          <p className="text-sm text-muted-foreground">
            Explore roles with concise overviews and why they fit different
            traits.
          </p>
        </div>
        <Input
          className="max-w-sm"
          placeholder="Search careers"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((c) => (
          <Card key={c.id} className="transition hover:shadow-lg">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.summary}</p>
              <div className="text-xs text-muted-foreground">
                Top strengths:{" "}
                {Object.entries(c.weights)
                  .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
                  .slice(0, 3)
                  .map(([k]) => k)
                  .join(", ")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
