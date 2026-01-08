import type { PomodoroSettings } from "../types";

interface Props {
  settings: PomodoroSettings;
  autoStartNext: boolean;
  soundEnabled: boolean;
  volume: number;
  darkMode: boolean;
  onChange: (s: PomodoroSettings) => void;
  onToggleAutoStart: () => void;
  onToggleSound: () => void;
  onToggleDarkMode: () => void;
  onVolumeChange: (v: number) => void;
}

export function Settings({
  settings,
  autoStartNext,
  soundEnabled,
  volume,
  darkMode,
  onChange,
  onToggleAutoStart,
  onToggleSound,
  onToggleDarkMode,
  onVolumeChange,
}: Props) {
  return (
    <div className="card settings-card">
      <h2 className="settings-title">Timer Settings</h2>

      {/* Durations */}
      <div className="settings-section">
        <h3 className="section-title icon-timer">Durations (minutes)</h3>

        <label>
          Focus
          <input
            type="number"
            min={1}
            value={settings.focusMinutes}
            onChange={(e) =>
              onChange({ ...settings, focusMinutes: +e.target.value })
            }
          />
        </label>

        <label>
          Short Break
          <input
            type="number"
            min={1}
            value={settings.shortBreakMinutes}
            onChange={(e) =>
              onChange({ ...settings, shortBreakMinutes: +e.target.value })
            }
          />
        </label>

        <label>
          Long Break
          <input
            type="number"
            min={1}
            value={settings.longBreakMinutes}
            onChange={(e) =>
              onChange({ ...settings, longBreakMinutes: +e.target.value })
            }
          />
        </label>

        <label>
          Sessions before long break
          <input
            type="number"
            min={1}
            value={settings.sessionsBeforeLongBreak}
            onChange={(e) =>
              onChange({
                ...settings,
                sessionsBeforeLongBreak: +e.target.value,
              })
            }
          />
        </label>
      </div>


      <div className="settings-section">
       <h3 className="section-title icon-behavior">Behavior</h3>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={autoStartNext}
            onChange={onToggleAutoStart}
          />
          Auto-start next session
        </label>
      </div>

 
      <div className="settings-section">
       <h3 className="section-title icon-sound">Sound & Appearance</h3>


        <label className="checkbox">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={onToggleSound}
          />
          Enable sound
        </label>

        <label>
          Volume
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => onVolumeChange(+e.target.value / 100)}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={onToggleDarkMode}
          />
          Dark mode
        </label>
      </div>
    </div>
  );
}
