import { formatTime } from "../utils/time"

export function Timer({ seconds }: { seconds: number }) {
  return (
    <h1
      style={{
        fontSize: "4rem",
        margin: "1rem 0",
        transition: "transform 0.2s ease"
      }}
    >
      {formatTime(seconds)}
    </h1>
  )
}

