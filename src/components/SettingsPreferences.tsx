interface Props {
  autoStartNext: boolean;
  soundEnabled: boolean;
  volume: number;
  darkMode: boolean;
  onToggleAutoStart: () => void;
  onToggleSound: () => void;
  onToggleDarkMode: () => void;
  onVolumeChange: (v: number) => void;
  onResetSettings: () => void;
  applyAfterSession: boolean;
  onToggleApplyAfterSession:()=>void;
}

export function SettingsPreferences({
  autoStartNext,
  soundEnabled,
  volume,
  darkMode,
  onToggleAutoStart,
  onToggleSound,
  onToggleDarkMode,
  onVolumeChange,
  onResetSettings,
  onToggleApplyAfterSession,
  applyAfterSession,
}: Props) {
  return (
    <div className="card settings-card">
      <h2>Preferences</h2>

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
      <button
        className="danger-btn"
        onClick={() => {
          if (confirm("Reset all settings to default values?")) {
            onResetSettings();
          }
        }}
      >
        Reset settings to defaults
      </button>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={applyAfterSession}
          onChange={onToggleApplyAfterSession}
        />
        Apply duration changes after current session
      </label>
    </div>
  );
}
