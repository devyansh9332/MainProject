import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
        <p className="mt-2 text-muted-foreground">
          NextStepNavigators helps students discover careers, plan roadmaps, and
          act on opportunities with personalized guidance.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">Our Mission</h2>
          <p className="text-sm leading-relaxed">
            We make career decisions simpler with an interactive quiz, clear
            roadmaps, curated opportunities, and job‑ready preparation tools
            like resume and interview practice.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">Contact</h2>
          <div className="text-sm">
            <p>
              Phone:{" "}
              <a
                className="text-sky-700 hover:underline"
                href="tel:+917206067254"
              >
                +91 7206067254
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                className="text-sky-700 hover:underline"
                href="mailto:devyansh704@gmail.com"
              >
                devyansh704@gmail.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">What We Offer</h2>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
            <li>Career Quiz with personalized recommendations</li>
            <li>Career Roadmaps with step‑by‑step milestones</li>
            <li>Opportunities Hub: internships, scholarships, events</li>
            <li>Resume Builder and Interview Prep</li>
            <li>Insights to track your progress</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
