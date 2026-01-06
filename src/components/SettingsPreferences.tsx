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
}: Props) {
  return (
    <div className="card settings-card">
      <div className="settings-header">
        <h2>Preferences</h2>
        <p className="settings-subtitle">Customize your experience</p>
      </div>

      <div className="settings-section">
        <h3 className="section-title icon-behavior">Behavior</h3>

        <div className="settings-toggle-group">
          <label className="toggle-label">
            <div className="toggle-wrapper">
              <input
                type="checkbox"
                checked={autoStartNext}
                onChange={onToggleAutoStart}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
            </div>
            <div className="toggle-content">
              <span className="toggle-title">Auto-start next session</span>
              <span className="toggle-description">Automatically begin the next session when one completes</span>
            </div>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title icon-sound">Sound & Appearance</h3>

        <div className="settings-toggle-group">
          <label className="toggle-label">
            <div className="toggle-wrapper">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={onToggleSound}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
            </div>
            <div className="toggle-content">
              <span className="toggle-title">Enable sound</span>
              <span className="toggle-description">Play notification sounds when sessions complete</span>
            </div>
          </label>

          {soundEnabled && (
            <div className="volume-control">
              <label className="volume-label">
                <span className="label-text">Volume</span>
                <span className="volume-value">{Math.round(volume * 100)}%</span>
              </label>
              <div className="volume-slider-wrapper">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(e) => onVolumeChange(+e.target.value / 100)}
                  className="volume-slider"
                  style={{ '--volume-percent': `${Math.round(volume * 100)}%` } as React.CSSProperties}
                />
              </div>
            </div>
          )}

          <label className="toggle-label">
            <div className="toggle-wrapper">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={onToggleDarkMode}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
            </div>
            <div className="toggle-content">
              <span className="toggle-title">Dark mode</span>
              <span className="toggle-description">Use dark theme for better focus</span>
            </div>
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button
          className="danger-btn"
          onClick={() => {
            if (confirm("Reset all settings to default values?")) {
              onResetSettings();
            }
          }}
        >
          <span>Reset to defaults</span>
        </button>
      </div>
    </div>
  );
}
