import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="Open menu" className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-600 to-teal-500 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>NextStepNavigators</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/pricing")}>Pricing</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/about")}>About Us</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/contact")}>Contact Us</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => navigate("/faq")}>FAQ</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate("/support")}>Support</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate("/roadmap")}>Roadmap</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/" className="text-lg font-bold tracking-tight">
              NextStepNavigators
            </Link>
          </div>
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
