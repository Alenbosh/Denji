import type { PomodoroSettings } from "../types";

interface Props {
  settings: PomodoroSettings;
  onChange: (s: PomodoroSettings) => void;
  running: boolean;
  pendingSettings?: PomodoroSettings;
}

export function SettingsDurations({
  settings,
  onChange,
  running,
  pendingSettings,
}: Props) {
  return (
    <div className="card settings-card">
      <h2>Timer Durations</h2>

      <div className="settings-section">
        <h3 className="section-title icon-timer">Durations (minutes)</h3>

        <label>
          Focus
          <input
            type="number"
            min={1}
            disabled={running}
            title={running ? "Pause the timer to edit durations" : ""}
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
          {pendingSettings && (
            <p className="settings-hint">
              Changes will apply after the current session ends.
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
