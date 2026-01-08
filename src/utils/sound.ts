let audioCtx: AudioContext | null = null

export function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  // Resume AudioContext if suspended 
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {
      // Silently fail - audio might not be allowed without user interaction
    })
  }
}

export async function playBeepSafe(
  enabled: boolean,
  volume: number,
  frequency = 880,
  duration = 0.15
) {
  if (!enabled) return  


  if (!audioCtx) {
    initAudio()
  }

  if (!audioCtx) return

  // Resume AudioContext if suspended
  if (audioCtx.state === "suspended") {
    try {
      await audioCtx.resume()
    } catch (e) {
      // AudioContext might not be resumable without user interaction
      return
    }
  }

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
