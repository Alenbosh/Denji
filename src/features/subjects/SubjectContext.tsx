import { createContext, useContext, useState } from "react"
import type { Subject } from "./model/Subject"
import { loadSubjects, saveSubjects } from "./storage"

interface SubjectContextValue {
  subjects: Subject[]
  addSubject: (name: string) => void
}

const SubjectContext = createContext<SubjectContextValue | null>(null)

export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>(loadSubjects)

  function addSubject(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return

    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name: trimmed,
      color: pickColor(subjects.length),
      createdAt: new Date().toISOString(),
    }

    const next = [...subjects, newSubject]
    setSubjects(next)
    saveSubjects(next)
  }

  return (
    <SubjectContext.Provider value={{ subjects, addSubject }}>
      {children}
    </SubjectContext.Provider>
  )
}

export function useSubjects() {
  const ctx = useContext(SubjectContext)
  if (!ctx) throw new Error("useSubjects must be used inside SubjectProvider")
  return ctx
}


const COLORS = [
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#22c55e",
]

function pickColor(i: number) {
  return COLORS[i % COLORS.length]
}

