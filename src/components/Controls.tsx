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
    <div className="controls">
      <button 
        className="control-btn control-btn-primary"
        onClick={running ? onPause : onStart}
      >
        <span className="control-icon">
          {running ? "⏸" : "▶"}
        </span>
        <span>{running ? "Pause" : "Start"}</span>
      </button>
      
      <div className="controls-secondary">
        <button 
          className="control-btn control-btn-secondary"
          onClick={onSkip}
        >
          <span className="control-icon">⏭</span>
          <span>Skip</span>
        </button>
        <button 
          className="control-btn control-btn-secondary"
          onClick={onReset}
        >
          <span className="control-icon">↻</span>
          <span>Reset</span>
        </button>
      </div>
    </div>
  )
}
