// src/utils/subjectInsights.ts
import type { PomodoroSession } from "../types"
import type { Subject } from "../features/subjects/model/Subject"
import { computeSubjectStreak } from "./streaks"

const DAY_MS = 1000 * 60 * 60 * 24

function daysBetween(a: Date, b: Date) {
  return Math.floor((a.getTime() - b.getTime()) / DAY_MS)
}

function isWithinLast7Days(date: Date) {
  const now = new Date()
  return now.getTime() - date.getTime() <= 7 * DAY_MS
}

export function getSubjectInsights(
  sessions: PomodoroSession[],
  subjects: Subject[]
) {
  const focusSessions = sessions.filter(
    (s) => s.type === "focus" && s.subjectId
  )

  return subjects.map((subject) => {
    const subjectSessions = focusSessions.filter(
      (s) => s.subjectId === subject.id
    )

    // last studied
    const lastSession = subjectSessions
      .map((s) => new Date(s.completedAtIST))
      .sort((a, b) => b.getTime() - a.getTime())[0]

    const lastStudiedAt = lastSession
      ? lastSession.toISOString()
      : null

    const daysInactive = lastSession
      ? daysBetween(new Date(), lastSession)
      : null

    const weeklyMinutes = subjectSessions
      .filter((s) =>
        isWithinLast7Days(new Date(s.completedAtIST))
      )
      .reduce((sum, s) => sum + s.duration, 0)

    const streak = computeSubjectStreak(subject.id, sessions)

    return {
      subject,
      lastStudiedAt,
      daysInactive,
      weeklyMinutes,
      streak,
    }
  })
}
