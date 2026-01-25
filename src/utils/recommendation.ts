// src/utils/recommendation.ts
import type { Subject } from "../features/subjects/model/Subject"
import type { PomodoroSession } from "../types"
import { getSubjectInsights } from "./subjectInsights"

export function recommendSubject(
  sessions: PomodoroSession[],
  subjects: Subject[]
): Subject | null {
  if (subjects.length === 0) return null

  const insights = getSubjectInsights(sessions, subjects)

  const ranked = [...insights].sort((a, b) => {
    // never studied first
    if (a.lastStudiedAt === null && b.lastStudiedAt !== null) return -1
    if (a.lastStudiedAt !== null && b.lastStudiedAt === null) return 1

    // longest inactive
    if (a.daysInactive !== null && b.daysInactive !== null) {
      if (a.daysInactive !== b.daysInactive) {
        return b.daysInactive - a.daysInactive
      }
    }

    // weaker streak first
    if (a.streak !== b.streak) {
      return a.streak - b.streak
    }

    // lower weekly minutes
    return a.weeklyMinutes - b.weeklyMinutes
  })

  return ranked[0]?.subject ?? null
}
