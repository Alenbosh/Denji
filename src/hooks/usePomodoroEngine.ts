import { useEffect, useRef } from "react"
import type { PomodoroAction } from "../reducer/pomodoroReducer"

export function usePomodoroEngine(
  running: boolean,
  dispatch: React.Dispatch<PomodoroAction>
) {
  const ref = useRef<number | null>(null)

  useEffect(() => {
    if (!running) {
      if (ref.current) clearInterval(ref.current)
      ref.current = null
      return
    }

    ref.current = window.setInterval(() => {
      dispatch({ type: "TICK" })
    }, 1000)

    return () => {
      if (ref.current) clearInterval(ref.current)
    }
  }, [running])
}
