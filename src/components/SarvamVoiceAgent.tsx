import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, ChevronRight, MessageSquare, Play, Square, Bot } from 'lucide-react';
import { sarvamVoice } from '../utils/sarvamVoice';

interface SarvamVoiceAgentProps {
  onOpenBooking: () => void;
}

export const SarvamVoiceAgent: React.FC<SarvamVoiceAgentProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentText, setCurrentText] = useState("Hi! I am Velocity's Voice Concierge, powered by Sarvam AI. Tap any question or press the mic to talk with me!");
  const [selectedVoice, setSelectedVoice] = useState<'arvind' | 'meera'>('arvind');

  useEffect(() => {
    const unsubscribe = sarvamVoice.subscribe((speaking, text) => {
      setIsSpeaking(speaking);
      if (text) setCurrentText(text);
    });
    return () => unsubscribe();
  }, []);

  const handleQuickPrompt = (promptText: string) => {
    const res = sarvamVoice.processQuery(promptText);
    sarvamVoice.speak(res.text, () => {
      if (res.action === 'book') {
        onOpenBooking();
      }
    });
  };

  const handleToggleMic = () => {
    if (isListening) {
      sarvamVoice.stopListening();
      setIsListening(false);
    } else {
      sarvamVoice.stop();
      setIsListening(true);
      setCurrentText("Listening... Ask me anything about Velocity Circuit!");
      sarvamVoice.startListening(
        (transcript) => {
          setIsListening(false);
          const res = sarvamVoice.processQuery(transcript);
          sarvamVoice.speak(res.text, () => {
            if (res.action === 'book') {
              onOpenBooking();
            }
          });
        },
        () => {
          setIsListening(false);
          setCurrentText("Could not hear speech clearly. Please try tapping a question below!");
        }
      );
    }
  };

  const handleToggleSpeaker = (speaker: 'arvind' | 'meera') => {
    setSelectedVoice(speaker);
    sarvamVoice.setSpeaker(speaker);
    sarvamVoice.speak(`Switched to Sarvam ${speaker === 'arvind' ? 'Arvind' : 'Meera'} voice.`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Expanded Voice Console */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-3rem)] max-w-sm rounded-[28px] p-2 bg-gradient-to-b from-[#0052FF]/30 via-slate-800/20 to-black/40 border border-[#0052FF]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="rounded-[22px] bg-[#070A14]/95 p-4 sm:p-5 border border-white/10 space-y-4">
            
            {/* Header: Sarvam AI Identity */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0052FF] to-[#00D2FF] flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-sm text-white tracking-tight">Sarvam Voice Agent</h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                    Powered by Sarvam AI • bulbul:v1
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sarvamVoice.stop();
                  setIsOpen(false);
                }}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Voice Model Switcher */}
            <div className="flex items-center justify-between bg-black/40 p-1 rounded-xl border border-white/5 text-[11px] font-mono">
              <span className="text-slate-400 pl-2">VOICE:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleToggleSpeaker('arvind')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedVoice === 'arvind'
                      ? 'bg-[#0052FF] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Arvind (EN-IN)
                </button>
                <button
                  onClick={() => handleToggleSpeaker('meera')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedVoice === 'meera'
                      ? 'bg-[#0052FF] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Meera (EN-IN)
                </button>
              </div>
            </div>

            {/* Audio Wave Visualizer & Live Transcript */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-3">
              {/* Dynamic Equalizer Bars */}
              <div className="flex items-center justify-center gap-1.5 h-7">
                {[40, 75, 100, 60, 90, 45, 80, 65, 95, 50, 85].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: isSpeaking || isListening ? `${h}%` : '20%',
                      animationDuration: `${0.4 + (i % 4) * 0.15}s`,
                    }}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isListening
                        ? 'bg-rose-500 animate-pulse'
                        : isSpeaking
                        ? 'bg-gradient-to-t from-[#0052FF] to-[#00D2FF] animate-bounce'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Speech Transcript */}
              <p className="text-xs text-slate-200 leading-relaxed font-sans italic min-h-[48px]">
                &ldquo;{currentText}&rdquo;
              </p>

              {/* Voice Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleToggleMic}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#38BDF8]" />}
                  <span>{isListening ? 'Stop Mic' : 'Speak to Agent'}</span>
                </button>

                {isSpeaking && (
                  <button
                    onClick={() => sarvamVoice.stop()}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <Square className="w-3 h-3 fill-current" />
                    <span>Mute</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Questions */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Ask Sarvam Voice:
              </span>
              <div className="flex flex-col gap-1.5 text-xs">
                <button
                  onClick={() => handleQuickPrompt("What are the pricing and packages?")}
                  className="w-full text-left p-2 rounded-xl bg-white/[0.04] hover:bg-[#0052FF]/20 hover:border-[#0052FF]/40 border border-white/5 text-slate-300 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>⚡ Race passes & ₹200 discount code</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => handleQuickPrompt("Tell me about the 1166m track and turns")}
                  className="w-full text-left p-2 rounded-xl bg-white/[0.04] hover:bg-[#0052FF]/20 hover:border-[#0052FF]/40 border border-white/5 text-slate-300 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>🏎️ 1,166M Track specs & 19 apex corners</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => handleQuickPrompt("Tell me about food and rooftop cafe")}
                  className="w-full text-left p-2 rounded-xl bg-white/[0.04] hover:bg-[#0052FF]/20 hover:border-[#0052FF]/40 border border-white/5 text-slate-300 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>🍕 Apex Rooftop Cafe & track viewing</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Direct Booking Fast-Track */}
            <button
              onClick={() => {
                sarvamVoice.stop();
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Book Pass Directly Online</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Sarvam Voice Pill Trigger */}
      <button
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            sarvamVoice.speak(
              `Hello! I am your Sarvam AI voice assistant for Velocity International Circuit. How can I help you today?`
            );
          } else {
            sarvamVoice.stop();
            setIsOpen(false);
          }
        }}
        aria-label="Open Sarvam Voice Assistant"
        className="group flex items-center gap-2.5 bg-[#070A14]/95 hover:bg-[#0D1224] border border-[#0052FF]/40 hover:border-[#00D2FF]/60 px-4 py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,82,255,0.35)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
      >
        {/* Animated Soundwave / Green Status Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2FF]" />
        </span>

        <span className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition-colors flex items-center gap-1.5">
          <span>Sarvam Voice AI</span>
        </span>

        <div className="w-5 h-5 rounded-full bg-[#0052FF]/30 text-[#00D2FF] flex items-center justify-center group-hover:scale-110 transition-transform">
          <Mic className="w-3 h-3" />
        </div>
      </button>
    </div>
  );
};
