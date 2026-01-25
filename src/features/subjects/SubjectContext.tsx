import { createContext, useContext, useState } from "react";
import type { Subject } from "./model/Subject";
import { loadSubjects, saveSubjects, loadActiveSubject, saveActiveSubject } from "./storage";

interface SubjectContextValue {
  subjects: Subject[];
  activeSubjectId: string | null;
  addSubject: (name: string) => void;
  setActiveSubject: (id: string | null) => void;
}


const SubjectContext = createContext<SubjectContextValue | null>(null);

export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>(loadSubjects);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(loadActiveSubject());

  function addSubject(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const subject: Subject = {
      id: crypto.randomUUID(),
      name: trimmed,
      color: pickColor(subjects.length),
      createdAt: new Date().toISOString(),
    };

    const next = [...subjects, subject];
    setSubjects(next);
    saveSubjects(next);
  }

  function setActiveSubject(id: string | null) {
    setActiveSubjectId(id);
    saveActiveSubject(id);
  }

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        activeSubjectId,
        addSubject,
        setActiveSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubjects() {
  const ctx = useContext(SubjectContext);
  if (!ctx) throw new Error("useSubjects must be used inside SubjectProvider");
  return ctx;
}


const COLORS = [
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#22c55e",
];

function pickColor(i: number) {
  return COLORS[i % COLORS.length];
}
