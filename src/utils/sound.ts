let audioCtx: AudioContext | null = null

export function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
}

export function playBeepSafe(
  enabled: boolean,
  volume: number,
  frequency = 880,
  duration = 0.15
) {
  if (!enabled || !audioCtx) return   // 🔕 HARD GUARD

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc.type = "sine"
  osc.frequency.value = frequency

  gain.gain.setValueAtTime(volume, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + duration
  )

  osc.connect(gain)
  gain.connect(audioCtx.destination)

  osc.start()
  osc.stop(audioCtx.currentTime + duration)
}
