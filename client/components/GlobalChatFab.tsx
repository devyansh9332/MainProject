import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function GlobalChatFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="Open AI Career Counselor"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 to-teal-500 text-white shadow-lg"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-80 overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="border-b p-3 font-semibold">AI Career Counselor</div>
          <div className="h-48 space-y-2 overflow-auto p-3 text-sm">
            <div className="rounded-md bg-secondary p-2">
              Hi! Ask about careers, exams, or colleges.
            </div>
          </div>
          <div className="flex gap-2 border-t p-3">
            <input
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none"
              placeholder="Type here…"
            />
            <Button size="sm">Send</Button>
          </div>
        </div>
      )}
    </>
  );
}
