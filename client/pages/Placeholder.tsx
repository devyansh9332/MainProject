import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      {description ? (
        <p className="mt-3 text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button asChild variant="default">
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
