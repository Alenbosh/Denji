import type { PomodoroSettings } from "../types";
export function Settings({
  settings,
  autoStartNext,
  soundEnabled,
  darkMode,
  volume,
  onChange,
  onToggleDarkMode,
  onToggleAutoStart,
  onToggleSound,
  onVolumeChange,
}: {
  settings: PomodoroSettings;
  autoStartNext: boolean;
  soundEnabled: boolean;
  volume: number;
  darkMode: boolean;
  onToggleDarkMode:()=> void;
  onChange: (s: PomodoroSettings) => void;
  onToggleAutoStart: () => void;
  onToggleSound: () => void;
  onVolumeChange: (v: number) => void;
}) {
  return (
    <div>
      <h3>Settings</h3>

      {Object.entries(settings).map(([k, v]) => (
        <label key={k} style={{ display: "block" }}>
          {k}
          <input
            type="number"
            value={v}
            onChange={(e) =>
              onChange({ ...settings, [k]: Number(e.target.value) })
            }
          />
        </label>
      ))}

      <label>
        <input
          type="checkbox"
          checked={autoStartNext}
          onChange={onToggleAutoStart}
        />
        Auto-start next session
      </label>

      <label>
        <input
          type="checkbox"
          checked={soundEnabled}
          onChange={onToggleSound}
        />
        Sound enabled
      </label>

      <label>
        <input type="checkbox" checked={darkMode} onChange={onToggleDarkMode} />
        Dark mode
      </label>

      <label>
        Volume
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(volume * 100)}
          onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
        />
      </label>
    </div>
  );
}
