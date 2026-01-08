import { usePomodoro } from "../context/PomodoroContext";
import { SettingsDurations } from "../components/SettingsDurations";
import { SettingsPreferences } from "../components/SettingsPreferences";
import { saveSettings } from "../utils/storage";

export default function SettingsPage() {
  const { state, dispatch } = usePomodoro();

  return (
    <section className="page settings-page">
      <h1 className="page-title">Settings</h1>

      <div className="settings-layout">
        <SettingsDurations
          settings={state.settings}
          pendingSettings={state.pendingSettings} 
          running={state.running}
          onChange={(s) => {
            dispatch({ type: "UPDATE_SETTINGS", payload: s });
            if (!state.running) {
              saveSettings(s);
            }
          }}
        />

        <SettingsPreferences
          autoStartNext={state.autoStartNext}
          soundEnabled={state.soundEnabled}
          volume={state.volume}
          darkMode={state.darkMode}
          onToggleAutoStart={() => dispatch({ type: "TOGGLE_AUTO_START" })}
          onToggleSound={() => dispatch({ type: "TOGGLE_SOUND" })}
          onToggleDarkMode={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
          onVolumeChange={(v) => dispatch({ type: "SET_VOLUME", payload: v })}
          onResetSettings={() => {
            dispatch({ type: "RESET_SETTINGS" });
            saveSettings(state.defaultSettings);
          }}
        />
      </div>
    </section>
  );
}
