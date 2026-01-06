import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { PomodoroSession } from "../types";
import { useMemo } from "react";

const COLORS = {
  focus: "#ff6b6b",
  shortBreak: "#4ade80",
  longBreak: "#60a5fa",
};

const LABELS: Record<string, string> = {
  focus: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

export function SessionPieChart({
  sessions,
}: {
  sessions: PomodoroSession[];
}) {
  const { durationData, countData } = useMemo(() => {
    const durationMap = sessions.reduce((acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + s.duration;
      return acc;
    }, {} as Record<string, number>);

    const countMap = sessions.reduce((acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const durationData = Object.entries(durationMap).map(([name, value]) => ({
      name: LABELS[name] || name,
      value,
      type: name,
    }));

    const countData = Object.entries(countMap).map(([name, value]) => ({
      name: LABELS[name] || name,
      value,
      type: name,
    }));

    return { durationData, countData };
  }, [sessions]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">{data.value} min</p>
        </div>
      );
    }
    return null;
  };

  const renderLabel = (entry: any) => {
    const percentage = ((entry.value / durationData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(0);
    return percentage !== "0" ? `${percentage}%` : "";
  };

  if (sessions.length === 0) {
    return (
      <div className="card">
        <h3>Session Distribution</h3>
        <p style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          No sessions yet
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Session Distribution</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem", color: "#666" }}>
            By Duration
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={durationData}
                dataKey="value"
                outerRadius={70}
                label={renderLabel}
                labelLine={false}
              >
                {durationData.map((entry) => (
                  <Cell 
                    key={`duration-${entry.type}`} 
                    fill={COLORS[entry.type as keyof typeof COLORS] || "#999"} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem", color: "#666" }}>
            By Count
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={countData}
                dataKey="value"
                outerRadius={70}
                label={renderLabel}
                labelLine={false}
              >
                {countData.map((entry) => (
                  <Cell 
                    key={`count-${entry.type}`} 
                    fill={COLORS[entry.type as keyof typeof COLORS] || "#999"} 
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0];
                    return (
                      <div className="chart-tooltip">
                        <p className="tooltip-label">{data.name}</p>
                        <p className="tooltip-value">{data.value} session{data.value !== 1 ? "s" : ""}</p>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        {durationData.map((entry) => (
          <div 
            key={`legend-${entry.type}`}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.5rem",
              fontSize: "0.85rem"
            }}
          >
            <div 
              style={{ 
                width: "12px", 
                height: "12px", 
                backgroundColor: COLORS[entry.type as keyof typeof COLORS] || "#999",
                borderRadius: "2px"
              }} 
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
