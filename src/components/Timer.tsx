interface TimerProps {
  seconds: number;
  totalSeconds: number;
  mode: "focus" | "shortBreak" | "longBreak";
  pulse?: boolean;
}

export function Timer({ seconds, totalSeconds, mode, pulse }: TimerProps) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const percentage = seconds / totalSeconds;
  const strokeDashoffset = circumference - percentage * circumference;

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`timer ${mode} ${pulse ? "pulse" : ""}`}>
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <circle
          className="timer-bg"
          cx="100"
          cy="100"
          r={radius}
        />
        <circle
          className="timer-progress"
          cx="100"
          cy="100"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="timer-text">
        {formatTime(seconds)}
      </div>
    </div>
  );
}
