import { getSessions } from "../utils/storage"

export function Stats() {
  const sessions = getSessions()
  const focusMinutes = sessions
    .filter(s => s.type === "focus")
    .reduce((a, b) => a + b.duration, 0)

  return (
    <div>
      <h3>Stats</h3>
      <p>Total focus minutes: {focusMinutes}</p>
      <p>Total sessions: {sessions.length}</p>
    </div>
  )
}
