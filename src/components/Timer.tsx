// import { useEffect, useRef } from "react";

// interface TimerProps {
//   seconds: number;
//   totalSeconds: number;
//   mode: "focus" | "shortBreak" | "longBreak";
//   pulse?: boolean;
// }

// const RADIUS = 90;
// const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// export function Timer({ seconds, totalSeconds, mode, pulse }: TimerProps) {
//   const circleRef = useRef<SVGCircleElement | null>(null);

//   useEffect(() => {
//     if (!circleRef.current) return;

//     // Clamp progress between 0 and 1 to prevent weird ring behavior
//     // This can happen if settings change while timer is running
//     const progress = Math.max(0, Math.min(1, seconds / totalSeconds));

//     circleRef.current.style.strokeDasharray = `${CIRCUMFERENCE}`;
//     circleRef.current.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - progress)}`;
//   }, [seconds, totalSeconds]);

//   const minutes = Math.floor(seconds / 60);
//   const secs = seconds % 60;

//   return (
//     <div className={`timer ${mode} ${pulse ? "pulse":""}`}>
//       <svg width="220" height="220">
//         <circle
//           className="timer-bg"
//           cx="110"
//           cy="110"
//           r={RADIUS}
//         />
//         <circle
//           ref={circleRef}
//           className="timer-progress"
//           cx="110"
//           cy="110"
//           r={RADIUS}
//         />
//       </svg>

//       <div className="timer-text">
//         {minutes}:{secs.toString().padStart(2, "0")}
//       </div>
//     </div>
//   );
// }

/*
 * Logic:
 * We wrap the SVG and the Text in a relative container.
 * The SVG uses a viewBox to remain scale-independent.
 * The stroke-dashoffset calculation handles the visual progress.
 */

interface TimerProps {
  seconds: number;
  totalSeconds: number;
  mode: "focus" | "shortBreak" | "longBreak";
  pulse?: boolean;
}

export function Timer({ seconds, totalSeconds, mode, pulse }: TimerProps) {
  // Radius of the circle is 90 (from center 100, stroke width 14)
  // Circumference = 2 * PI * r => 2 * 3.14159 * 90 ≈ 565.48
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
        {/* Background Track */}
        <circle
          className="timer-bg"
          cx="100"
          cy="100"
          r={radius}
        />
        {/* Progress Ring */}
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
