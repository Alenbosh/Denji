import type { Subject } from "./model/Subject"

const KEY = "denji.subjects"

export function loadSubjects(): Subject[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveSubjects(subjects: Subject[]) {
  localStorage.setItem(KEY, JSON.stringify(subjects))
}
