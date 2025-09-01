import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-600 to-violet-600" />
            <span className="text-lg font-bold tracking-tight">
              NextStepNavigators
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              variant={
                location.pathname === "/profile" ? "secondary" : "outline"
              }
            >
              <Link to="/profile">Profile</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="container py-8 min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
}
