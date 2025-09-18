import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { saveInterview } from "@/lib/api";
import type { InterviewPrepData, QA, Category } from "@shared/interview";
import {
  COMMON_QUESTIONS,
  BEHAVIORAL_QUESTIONS,
  TECHNICAL_QUESTIONS,
} from "@shared/interview";

const STORAGE_KEY = "nsn.interview.v1";

function makeQA(q: string, cat: Category): QA {
  return {
    id: `${cat}_${q.slice(0, 16).replace(/\W+/g, "").toLowerCase()}`,
    question: q,
    answer: "",
    done: false,
    category: cat,
  };
}

export default function InterviewPrep() {
  const { toast } = useToast();
  const [data, setData] = useState<InterviewPrepData>({ qas: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
      else
        setData({
          qas: [
            ...COMMON_QUESTIONS.map((q) => makeQA(q, "common")),
            ...BEHAVIORAL_QUESTIONS.map((q) => makeQA(q, "behavioral")),
            ...TECHNICAL_QUESTIONS.map((q) => makeQA(q, "technical")),
          ],
        });
    } catch {
      setData({ qas: [] });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const progress = useMemo(() => {
    const total = data.qas.length || 1;
    const done = data.qas.filter((q) => q.done).length;
    return Math.round((done / total) * 100);
  }, [data]);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interview-prep.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const submit = async () => {
    try {
      const resp = await saveInterview(data);
      toast({ title: "Saved", description: `Reference: ${resp.id}` });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed",
      });
    }
  };

  const renderList = (cat: Category) => (
    <div className="space-y-3">
      {data.qas
        .filter((q) => q.category === cat)
        .map((qa, idx) => (
          <Card key={qa.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium">
                  {idx + 1}. {qa.question}
                </p>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={qa.done}
                    onCheckedChange={(v) =>
                      setData((d) => ({
                        ...d,
                        qas: d.qas.map((x) =>
                          x.id === qa.id ? { ...x, done: Boolean(v) } : x,
                        ),
                      }))
                    }
                  />
                  <span className="text-xs text-muted-foreground">Done</span>
                </div>
              </div>
              <Textarea
                placeholder="Draft your answer using STAR: Situation, Task, Action, Result"
                value={qa.answer}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    qas: d.qas.map((x) =>
                      x.id === qa.id ? { ...x, answer: e.target.value } : x,
                    ),
                  }))
                }
              />
            </CardContent>
          </Card>
        ))}
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Interview Prep</h1>
          <p className="text-sm text-muted-foreground">
            Track answers, mark practice done, and save progress.
          </p>
        </div>
        <div className="w-48">
          <Progress value={progress} />
          <p className="mt-1 text-xs text-muted-foreground text-right">
            {progress}% complete
          </p>
        </div>
      </div>

      <Tabs defaultValue="common">
        <TabsList>
          <TabsTrigger value="common">Common</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>
        <TabsContent value="common">{renderList("common")}</TabsContent>
        <TabsContent value="behavioral">{renderList("behavioral")}</TabsContent>
        <TabsContent value="technical">{renderList("technical")}</TabsContent>
      </Tabs>

      <div className="flex items-center gap-2">
        <Button onClick={submit}>Save to API</Button>
        <Button variant="outline" onClick={exportJSON}>
          Export JSON
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
