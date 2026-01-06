import { useEffect, useRef } from "react";

interface TimerProps {
  seconds: number;
  totalSeconds: number;
  mode: "focus" | "shortBreak" | "longBreak";
  pulse?: boolean;
}

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Timer({ seconds, totalSeconds, mode, pulse }: TimerProps) {
  const circleRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    const progress = seconds / totalSeconds;

    circleRef.current.style.strokeDasharray = `${CIRCUMFERENCE}`;
    circleRef.current.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - progress)}`;
  }, [seconds, totalSeconds]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isComplete = seconds === 0;

  return (
    <div className={`timer ${mode} ${isComplete ? "complete" : ""} ${pulse ? "pulse":""}`}>
      <svg width="220" height="220">
        <circle
          className="timer-bg"
          cx="110"
          cy="110"
          r={RADIUS}
        />
        <circle
          ref={circleRef}
          className="timer-progress"
          cx="110"
          cy="110"
          r={RADIUS}
        />
      </svg>

      <div className="timer-text">
        {minutes}:{secs.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
