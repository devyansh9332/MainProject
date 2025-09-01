import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const INTERESTS = [
  "Engineering",
  "Medicine",
  "Design",
  "Business",
  "Law",
  "Arts",
  "Data Science",
  "Coding",
  "Govt Exams",
  "Marketing",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (i: string) => {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, email, education, interests };
    try {
      localStorage.setItem("nsn-user-profile", JSON.stringify(payload));
    } catch {}
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Tell us about you</h1>
      <p className="mt-2 text-muted-foreground">
        This helps personalize career recommendations, deadlines, and opportunities.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Education Level</Label>
          <Select value={education} onValueChange={setEducation}>
            <SelectTrigger>
              <SelectValue placeholder="Select your current level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10th">10th</SelectItem>
              <SelectItem value="12th">12th</SelectItem>
              <SelectItem value="college">College</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label>Interests</Label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <Button
                key={i}
                type="button"
                variant={interests.includes(i) ? "default" : "outline"}
                onClick={() => toggleInterest(i)}
                className={interests.includes(i) ? "" : "text-muted-foreground"}
              >
                {i}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" className="px-6">Continue to Dashboard</Button>
          <Button type="button" variant="ghost" onClick={() => navigate("/dashboard")}>Skip for now</Button>
        </div>
      </form>
    </div>
  );
}
