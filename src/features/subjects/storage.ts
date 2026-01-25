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

const ACTIVE_SUBJECT_KEY = "denji.activeSubjectId";

export function loadActiveSubject(): string | null {
  return localStorage.getItem(ACTIVE_SUBJECT_KEY);
}

export function saveActiveSubject(id: string | null) {
  if (id === null) {
    localStorage.removeItem(ACTIVE_SUBJECT_KEY);
  } else {
    localStorage.setItem(ACTIVE_SUBJECT_KEY, id);
  }
}
