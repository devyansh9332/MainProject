import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between bg-gradient-to-br from-sky-50 via-teal-50 to-white px-6 py-8 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-sm text-sky-700 ring-1 ring-sky-200 backdrop-blur dark:bg-slate-800/70 dark:text-sky-200 dark:ring-sky-900/40">
          Smart India Hackathon 2025 Project
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Welcome to {" "}
          <span className="bg-gradient-to-r from-sky-600 to-teal-500 bg-clip-text text-transparent">
            NextStepNavigators
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-base md:text-lg text-muted-foreground">
          Your one-stop career & education advisor.
        </p>

        <div className="mt-10 grid w-full max-w-sm gap-3">
          <Button
            variant="outline"
            className="w-full border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            onClick={() => navigate("/onboarding")}
          >
            Login with Google
          </Button>
          <Button
            className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
            onClick={() => navigate("/onboarding")}
          >
            Login with GitHub
          </Button>
        </div>
      </main>

      <footer className="mt-10 text-center text-sm text-gray-500">
        Smart India Hackathon 2025 Project
      </footer>
    </div>
  );
}
