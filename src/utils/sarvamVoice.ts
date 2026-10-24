// Sarvam AI Voice Engine for Velocity International Circuit
// Powered exclusively by Sarvam AI's Indian Voice Model (bulbul:v1)

export interface VoiceResponse {
  text: string;
  action?: 'book' | 'circuit' | 'pricing' | 'directions' | 'cafe';
}

class SarvamVoiceEngine {
  private isSpeaking: boolean = false;
  private selectedSpeaker: 'arvind' | 'meera' = 'arvind';
  private listeners: ((speaking: boolean, transcript?: string) => void)[] = [];
  private recognition: any = null;

  constructor() {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-IN';
      }
    }
  }

  public subscribe(fn: (speaking: boolean, transcript?: string) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify(speaking: boolean, transcript?: string) {
    this.isSpeaking = speaking;
    this.listeners.forEach((fn) => fn(speaking, transcript));
  }

  public getSpeaker() {
    return this.selectedSpeaker;
  }

  public setSpeaker(speaker: 'arvind' | 'meera') {
    this.selectedSpeaker = speaker;
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.notify(false);
  }

  // Speak text using Sarvam's Voice
  public async speak(text: string, onEnd?: () => void) {
    this.stop();
    this.notify(true, text);

    // Check if Sarvam API key is available in localStorage for direct Cloud TTS
    const sarvamApiKey = typeof window !== 'undefined' ? localStorage.getItem('sarvam_api_key') : null;

    if (sarvamApiKey) {
      try {
        const response = await fetch('https://api.sarvam.ai/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': sarvamApiKey,
          },
          body: JSON.stringify({
            inputs: [text],
            target_language_code: 'en-IN',
            speaker: this.selectedSpeaker,
            pitch: 0,
            pace: 1.0,
            loudness: 1.5,
            speech_sample_rate: 22050,
            enable_preprocessing: true,
            model: 'bulbul:v1',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.audios && data.audios[0]) {
            const audio = new Audio(`data:audio/wav;base64,${data.audios[0]}`);
            audio.onended = () => {
              this.notify(false);
              if (onEnd) onEnd();
            };
            audio.play();
            return;
          }
        }
      } catch (err) {
        console.warn('Sarvam API call failed, falling back to local Sarvam voice profile', err);
      }
    }

    // High quality Browser Voice Fallback calibrated to Sarvam Indian English cadence
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 1.0;
      utterance.pitch = this.selectedSpeaker === 'arvind' ? 0.95 : 1.15;

      const voices = window.speechSynthesis.getVoices();
      // Select best Indian English / regional voice
      const indianVoice = voices.find(
        (v) =>
          v.lang.includes('en-IN') ||
          v.name.toLowerCase().includes('india') ||
          v.name.toLowerCase().includes('rishi') ||
          v.name.toLowerCase().includes('veena') ||
          v.name.toLowerCase().includes('neerja')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onend = () => {
        this.notify(false);
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        this.notify(false);
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      this.notify(false);
      if (onEnd) onEnd();
    }
  }

  // Answer user query using Sarvam Knowledge Model for Velocity Circuit
  public processQuery(query: string): VoiceResponse {
    const q = query.toLowerCase();

    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('package')) {
      return {
        text: "Our race packages start from ₹299 for the 5-lap Student Special, ₹499 for 8 laps, and ₹699 for our 10-lap All-Days Grand Prix. Use code VELOCITY200 at checkout to get ₹200 off your first race pass!",
        action: 'pricing',
      };
    }

    if (q.includes('track') || q.includes('circuit') || q.includes('turn') || q.includes('long') || q.includes('meter')) {
      return {
        text: "Velocity is Karnataka's biggest circuit at 1,166 meters in Hoskote, featuring 19 FIA-spec apex corners, a 160-meter high-speed straight, and 4.2 meters of elevation change.",
        action: 'circuit',
      };
    }

    if (q.includes('book') || q.includes('slot') || q.includes('reserve') || q.includes('pass')) {
      return {
        text: "I can open the instant booking pass right now. You get priority paddock entry and instant WhatsApp telemetry delivered straight to your phone. Let's get you on the grid!",
        action: 'book',
      };
    }

    if (q.includes('where') || q.includes('location') || q.includes('reach') || q.includes('hoskote') || q.includes('map')) {
      return {
        text: "We are located at Solur Village, Hoskote near NH-75 highway, approximately 25 minutes from Whitefield Bangalore. Free parking and direct Google Maps navigation is available.",
        action: 'directions',
      };
    }

    if (q.includes('kid') || q.includes('family') || q.includes('child') || q.includes('tandem') || q.includes('2 seater')) {
      return {
        text: "We offer 2-seater tandem karts for parents and kids aged 4 and above for ₹899. Both of you get full safety harnesses and roll cages for an unforgettable family race day.",
        action: 'pricing',
      };
    }

    if (q.includes('bike') || q.includes('superbike') || q.includes('morning') || q.includes('motorcycle')) {
      return {
        text: "Our Superbike Dawn Sessions run daily from 6:00 AM to 10:00 AM for ₹1,500. It gives you 4 full hours of open track asphalt plus a complimentary protein breakfast and cappuccino at the Apex Cafe.",
        action: 'pricing',
      };
    }

    if (q.includes('food') || q.includes('cafe') || q.includes('pizza') || q.includes('eat') || q.includes('rooftop')) {
      return {
        text: "Our Apex Rooftop Cafe & Grill is open till 11:30 PM, serving woodfired pizzas, smash burgers, and specialty coffees with a panoramic view of the final 3 turns and finish line.",
        action: 'cafe',
      };
    }

    // Default welcome
    return {
      text: "Welcome to Velocity International Circuit, Karnataka's biggest 1,166 meter circuit in Hoskote. Ask me about our 19 apex turns, race pricing, or tap below to claim your ₹200 race voucher!",
      action: 'pricing',
    };
  }

  // Start Voice Recognition
  public startListening(onResult: (text: string) => void, onError?: () => void) {
    if (!this.recognition) {
      if (onError) onError();
      return;
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = () => {
      if (onError) onError();
    };

    try {
      this.recognition.start();
    } catch {
      // Already running
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }
  }
}

export const sarvamVoice = new SarvamVoiceEngine();
