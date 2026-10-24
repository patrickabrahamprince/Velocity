// Sound Engine - Neutralized to enforce ONLY Sarvam Voice across the application

class SoundEngine {
  public toggleMute(): boolean {
    return true;
  }

  public getIsMuted(): boolean {
    return true;
  }

  // Silenced: Only Sarvam's Voice is permitted on the platform
  public playRev(_intensity: number = 1.0) {
    // No-op: Removed all synthetic oscillator sounds in favor of Sarvam Voice
  }

  public playBeep(_isHigh: boolean = false) {
    // No-op
  }

  public playGearShift() {
    // No-op
  }
}

export const soundFx = new SoundEngine();
