import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData, Education, Experience, Project } from "@shared/resume";
import { saveResume } from "@/lib/api";

const STORAGE_KEY = "nsn.resume.v1";

function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

const emptyResume: ResumeData = {
  basics: { name: "", title: "", email: "", phone: "", location: "", summary: "" },
  skills: [],
  education: [],
  experience: [],
  projects: [],
};

export default function Resume() {
  const { toast } = useToast();
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const canSave = useMemo(() => data.basics.name && data.basics.email, [data]);

  const addEducation = () => setData((d) => ({ ...d, education: [...d.education, { id: uid(), institution: "", degree: "", start: "", end: "", details: "" }] }));
  const addExperience = () => setData((d) => ({ ...d, experience: [...d.experience, { id: uid(), company: "", role: "", start: "", end: "", achievements: [] }] }));
  const addProject = () => setData((d) => ({ ...d, projects: [...d.projects, { id: uid(), name: "", link: "", description: "", technologies: [] }] }));

  const onSubmit = async () => {
    try {
      const resp = await saveResume(data);
      toast({ title: "Resume saved", description: `Reference: ${resp.id}` });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed" });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5 print:hidden">
        <Card>
          <CardContent className="p-5 space-y-3">
            <h2 className="text-lg font-semibold">Basic Info</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="Full name" value={data.basics.name} onChange={(e) => setData({ ...data, basics: { ...data.basics, name: e.target.value } })} />
              <Input placeholder="Headline (e.g., Frontend Developer)" value={data.basics.title} onChange={(e) => setData({ ...data, basics: { ...data.basics, title: e.target.value } })} />
              <Input placeholder="Email" value={data.basics.email} onChange={(e) => setData({ ...data, basics: { ...data.basics, email: e.target.value } })} />
              <Input placeholder="Phone" value={data.basics.phone} onChange={(e) => setData({ ...data, basics: { ...data.basics, phone: e.target.value } })} />
              <Input placeholder="Location" value={data.basics.location} onChange={(e) => setData({ ...data, basics: { ...data.basics, location: e.target.value } })} />
            </div>
            <Textarea placeholder="Professional summary" value={data.basics.summary} onChange={(e) => setData({ ...data, basics: { ...data.basics, summary: e.target.value } })} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <h2 className="text-lg font-semibold">Skills</h2>
            <div className="flex gap-2">
              <Input placeholder="Add a skill and press Enter" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && skillInput.trim()) { setData({ ...data, skills: [...data.skills, skillInput.trim()] }); setSkillInput(""); } }} />
              <Button onClick={() => { if (skillInput.trim()) { setData({ ...data, skills: [...data.skills, skillInput.trim()] }); setSkillInput(""); } }}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <Badge key={`${s}_${i}`} onClick={() => setData({ ...data, skills: data.skills.filter((x, idx) => idx !== i) })} className="cursor-pointer" variant="secondary">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Education</h2>
              <Button size="sm" onClick={addEducation}>Add</Button>
            </div>
            {data.education.map((ed, idx) => (
              <div key={ed.id} className="rounded-md border p-3 grid gap-2">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Input placeholder="Institution" value={ed.institution} onChange={(e) => { const v = e.target.value; setData((d) => ({ ...d, education: d.education.map((x,i)=> i===idx ? { ...x, institution: v } : x) })); }} />
                  <Input placeholder="Degree" value={ed.degree} onChange={(e) => { const v = e.target.value; setData((d) => ({ ...d, education: d.education.map((x,i)=> i===idx ? { ...x, degree: v } : x) })); }} />
                  <Input placeholder="Start (e.g., 2022)" value={ed.start} onChange={(e) => { const v = e.target.value; setData((d) => ({ ...d, education: d.education.map((x,i)=> i===idx ? { ...x, start: v } : x) })); }} />
                  <Input placeholder="End (e.g., 2026 or Present)" value={ed.end} onChange={(e) => { const v = e.target.value; setData((d) => ({ ...d, education: d.education.map((x,i)=> i===idx ? { ...x, end: v } : x) })); }} />
                </div>
                <Textarea placeholder="Highlights (awards, GPA, coursework)" value={ed.details} onChange={(e) => { const v = e.target.value; setData((d) => ({ ...d, education: d.education.map((x,i)=> i===idx ? { ...x, details: v } : x) })); }} />
                <div className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setData((d) => ({ ...d, education: d.education.filter((_,i)=> i!==idx) }))}>Remove</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Experience</h2>
              <Button size="sm" onClick={addExperience}>Add</Button>
            </div>
            {data.experience.map((ex, idx) => (
              <div key={ex.id} className="rounded-md border p-3 grid gap-2">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Input placeholder="Company" value={ex.company} onChange={(e) => { const v = e.target.value; setData((d)=> ({...d, experience: d.experience.map((x,i)=> i===idx? { ...x, company: v }: x) })); }} />
                  <Input placeholder="Role" value={ex.role} onChange={(e) => { const v = e.target.value; setData((d)=> ({...d, experience: d.experience.map((x,i)=> i===idx? { ...x, role: v }: x) })); }} />
                  <Input placeholder="Start (e.g., Jun 2024)" value={ex.start} onChange={(e) => { const v = e.target.value; setData((d)=> ({...d, experience: d.experience.map((x,i)=> i===idx? { ...x, start: v }: x) })); }} />
                  <Input placeholder="End (e.g., Present)" value={ex.end} onChange={(e) => { const v = e.target.value; setData((d)=> ({...d, experience: d.experience.map((x,i)=> i===idx? { ...x, end: v }: x) })); }} />
                </div>
                <Textarea placeholder="Achievements (one per line)" value={ex.achievements.join("\n")} onChange={(e) => { const lines = e.target.value.split("\n").map((s)=> s.trim()).filter(Boolean); setData((d)=> ({...d, experience: d.experience.map((x,i)=> i===idx? { ...x, achievements: lines }: x) })); }} />
                <div className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setData((d) => ({ ...d, experience: d.experience.filter((_,i)=> i!==idx) }))}>Remove</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Projects</h2>
              <Button size="sm" onClick={addProject}>Add</Button>
            </div>
            {data.projects.map((pr, idx) => (
              <div key={pr.id} className="rounded-md border p-3 grid gap-2">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Input placeholder="Project name" value={pr.name} onChange={(e)=>{ const v=e.target.value; setData((d)=> ({...d, projects: d.projects.map((x,i)=> i===idx? { ...x, name: v }: x) })) }} />
                  <Input placeholder="Link (GitHub / Live)" value={pr.link} onChange={(e)=>{ const v=e.target.value; setData((d)=> ({...d, projects: d.projects.map((x,i)=> i===idx? { ...x, link: v }: x) })) }} />
                </div>
                <Textarea placeholder="Description" value={pr.description} onChange={(e)=>{ const v=e.target.value; setData((d)=> ({...d, projects: d.projects.map((x,i)=> i===idx? { ...x, description: v }: x) })) }} />
                <Textarea placeholder="Technologies (one per line)" value={pr.technologies.join("\n")} onChange={(e)=>{ const lines=e.target.value.split("\n").map((s)=>s.trim()).filter(Boolean); setData((d)=> ({...d, projects: d.projects.map((x,i)=> i===idx? { ...x, technologies: lines }: x) })) }} />
                <div className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setData((d) => ({ ...d, projects: d.projects.filter((_,i)=> i!==idx) }))}>Remove</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex items-center gap-2">
          <Button onClick={onSubmit} disabled={!canSave}>Save to API</Button>
          <Button variant="secondary" onClick={() => window.print()}>Download PDF</Button>
          <Button variant="ghost" onClick={() => { setData(emptyResume); localStorage.removeItem(STORAGE_KEY); }}>Reset</Button>
        </div>
      </div>

      <div id="resume-preview" className="space-y-4">
        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{data.basics.name || "Your Name"}</h1>
              <p className="text-sm text-muted-foreground">{data.basics.title || "Title"}</p>
              <p className="text-xs text-muted-foreground">{[data.basics.email, data.basics.phone, data.basics.location].filter(Boolean).join(" • ")}</p>
            </div>
            {data.basics.summary && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide">Summary</h3>
                <p className="text-sm leading-relaxed">{data.basics.summary}</p>
              </div>
            )}
            {data.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide">Skills</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {data.skills.map((s,i)=> <Badge key={`${s}_${i}`} variant="secondary">{s}</Badge>)}
                </div>
              </div>
            )}
            {data.education.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide">Education</h3>
                <Separator className="my-2" />
                <div className="space-y-2">
                  {data.education.map((e)=> (
                    <div key={e.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{e.institution} — {e.degree}</span>
                        <span className="text-muted-foreground">{e.start} – {e.end}</span>
                      </div>
                      {e.details && <p className="text-sm text-muted-foreground">{e.details}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.experience.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide">Experience</h3>
                <Separator className="my-2" />
                <div className="space-y-2">
                  {data.experience.map((e)=> (
                    <div key={e.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{e.company} — {e.role}</span>
                        <span className="text-muted-foreground">{e.start} – {e.end}</span>
                      </div>
                      {e.achievements.length > 0 && (
                        <ul className="list-disc pl-6 text-sm text-muted-foreground">
                          {e.achievements.map((a,i)=> <li key={i}>{a}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.projects.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide">Projects</h3>
                <Separator className="my-2" />
                <div className="space-y-2">
                  {data.projects.map((p)=> (
                    <div key={p.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{p.name}</span>
                        {p.link && <a className="text-xs text-sky-700" href={p.link} target="_blank" rel="noreferrer">{p.link}</a>}
                      </div>
                      {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
                      {p.technologies.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {p.technologies.map((t,i)=> <Badge key={`${t}_${i}`} variant="secondary">{t}</Badge>)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <style>{`@media print { body * { visibility: hidden; } #resume-preview, #resume-preview * { visibility: visible; } #resume-preview { position: absolute; left: 0; top: 0; width: 100%; padding: 16px; } }`}</style>
    </div>
  );
}
