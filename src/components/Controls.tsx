export function Controls({
  running,
  onStart,
  onPause,
  onReset,
  onSkip
}: {
  running: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}) {
  return (
    <div>
      {!running ? (
        <button onClick={onStart}>Start</button>
      ) : (
        <button onClick={onPause}>Pause</button>
      )}
      <button onClick={onSkip}>Skip</button>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}
