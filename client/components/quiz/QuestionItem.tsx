import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Likert, QuizQuestion } from "@shared/quiz";

interface Props {
  question: QuizQuestion;
  value?: Likert;
  onChange: (value: Likert) => void;
  index?: number;
}

const SCALE: { value: Likert; label: string }[] = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

export default function QuestionItem({ question, value, onChange, index }: Props) {
  return (
    <Card className="border-sky-100 dark:border-sky-900/50">
      <CardContent className="p-5">
        <p className="font-medium">
          {typeof index === "number" ? `${index + 1}. ` : ""}
          {question.prompt}
        </p>
        <RadioGroup
          className="mt-4 grid gap-3 sm:grid-cols-5"
          value={value?.toString()}
          onValueChange={(v) => onChange(Number(v) as Likert)}
        >
          {SCALE.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2 rounded-md border p-2">
              <RadioGroupItem id={`${question.id}_${opt.value}`} value={opt.value.toString()} />
              <Label htmlFor={`${question.id}_${opt.value}`} className="text-sm">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
