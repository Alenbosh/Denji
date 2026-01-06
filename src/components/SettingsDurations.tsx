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
      <div className="settings-header">
        <h2>Timer Durations</h2>
        <p className="settings-subtitle">Customize your Pomodoro session lengths</p>
      </div>

      <div className="settings-section">
        <h3 className="section-title icon-timer">Durations</h3>

        <div className="settings-input-group">
          <label className="settings-label">
            <span className="label-text">Focus</span>
            <div className="input-wrapper">
              <input
                type="number"
                min={1}
                disabled={running}
                title={running ? "Pause the timer to edit durations" : ""}
                value={settings.focusMinutes}
                onChange={(e) =>
                  onChange({ ...settings, focusMinutes: +e.target.value })
                }
                className="settings-input"
              />
              <span className="input-suffix">min</span>
            </div>
          </label>

          <label className="settings-label">
            <span className="label-text">Short Break</span>
            <div className="input-wrapper">
              <input
                type="number"
                min={1}
                value={settings.shortBreakMinutes}
                onChange={(e) =>
                  onChange({ ...settings, shortBreakMinutes: +e.target.value })
                }
                className="settings-input"
              />
              <span className="input-suffix">min</span>
            </div>
          </label>

          <label className="settings-label">
            <span className="label-text">Long Break</span>
            <div className="input-wrapper">
              <input
                type="number"
                min={1}
                value={settings.longBreakMinutes}
                onChange={(e) =>
                  onChange({ ...settings, longBreakMinutes: +e.target.value })
                }
                className="settings-input"
              />
              <span className="input-suffix">min</span>
            </div>
          </label>

          <label className="settings-label">
            <span className="label-text">Sessions before long break</span>
            <div className="input-wrapper">
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
                className="settings-input"
              />
              <span className="input-suffix">sessions</span>
            </div>
            {pendingSettings && (
              <p className="settings-hint">
                ⏳ Changes will apply after the current session ends
              </p>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
