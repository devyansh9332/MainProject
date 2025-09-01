import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import NavMenu from "./NavMenu";
import GlobalChatFab from "@/components/GlobalChatFab";
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
        <div className="container flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <NavMenu />
            <Link to="/" className="text-lg font-bold tracking-tight">
              NextStepNavigators
            </Link>
          </div>
          <div className="hidden md:flex flex-1 max-w-xl">
            <Input
              placeholder="Search careers, exams, colleges…"
              className="w-full"
            />
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
      <GlobalChatFab />
    </div>
  );
}
