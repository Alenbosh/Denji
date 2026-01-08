import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { PomodoroSession } from "../types";
import { useMemo } from "react";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDate(date: Date): string {
  const today = startOfDay(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dateStart = startOfDay(date);
  
  if (dateStart.getTime() === today.getTime()) {
    return "Today";
  }
  if (dateStart.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function FocusBarChart({ sessions }: { sessions: PomodoroSession[] }) {
  const data = useMemo(() => {
    const last7Days: { day: string; date: Date; minutes: number; sessions: number }[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayStart = startOfDay(date);
      const nextDayStart = new Date(dayStart);
      nextDayStart.setDate(nextDayStart.getDate() + 1);
      

      const daySessions = sessions.filter((s) => {
        try {
          const completed = new Date(s.completedAtIST);
          if (i === 0) {
            return completed >= dayStart;
          } else {
            return completed >= dayStart && completed < nextDayStart;
          }
        } catch (e) {
          const datePart = s.completedAtIST.split(",")[0].trim();
          const parts = datePart.split("/");
          if (parts.length === 3) {
            const [day, month, year] = parts.map(Number);
            const completed = new Date(year, month - 1, day);
            if (i === 0) {
              return completed >= dayStart;
            } else {
              return completed >= dayStart && completed < nextDayStart;
            }
          }
          return false;
        }
      });
      
     
      const focusSessions = daySessions.filter((s) => s.type === "focus");
      const minutes = focusSessions.reduce((sum, s) => sum + s.duration, 0);
      const sessionCount = focusSessions.length;
      
      last7Days.push({
        day: formatDate(date),
        date: dayStart,
        minutes,
        sessions: sessionCount,
      });
    }
    
    return last7Days;
  }, [sessions]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.day}</p>
          <p className="tooltip-value">
            {data.minutes} min {data.sessions > 0 && `(${data.sessions} session${data.sessions !== 1 ? "s" : ""})`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3>Daily Focus (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="minutes" 
            name="Focus Minutes"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.minutes > 0 ? "#ff6b6b" : "#e0e0e0"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
