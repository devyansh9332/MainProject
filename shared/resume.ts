export interface Basics {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  start: string;
  end: string;
  details: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
  technologies: string[];
}

export interface ResumeData {
  basics: Basics;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

export interface ResumeSaveRequest {
  resume: ResumeData;
}

export interface ResumeSaveResponse {
  id: string;
  ok: true;
}
