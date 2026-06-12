import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HeartAnimation } from './components/HeartAnimation';
import { IntroMsg } from './components/IntroMsg';
import { QuizStep } from './components/QuizStep';
import { Interstitial } from './components/Interstitial';
import { FinalStep } from './components/FinalStep';

export default function App() {
  const [step, setStep] = useState(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const nextStep = () => setStep(s => s + 1);

  const playAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
  };

  useEffect(() => {
    playAudio();
  }, []);

  return (
    <div 
      className="h-[100dvh] w-full bg-black flex flex-col font-sans sm:p-4 sm:items-center sm:justify-center"
      onClick={playAudio}
      onTouchStart={playAudio}
    >
      <audio ref={audioRef} src="/guns.mp3" loop autoPlay />
      {/* 
        This wrapper creates a mobile-only layout even on desktop.
        Strict mobile viewport size, hidden overflow, with iOS style rounded corners 
      */}
      <div className="flex-1 w-full h-full max-w-md mx-auto bg-neutral-950 relative overflow-hidden shadow-2xl sm:rounded-[3rem] sm:border-[8px] sm:border-neutral-800 sm:max-h-[900px] sm:h-[90vh] sm:flex-none">
        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div 
              key="start" 
              className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-50"
              exit={{ opacity: 0 }}
            >
              <button 
                onClick={() => {
                  playAudio();
                  nextStep();
                }}
                className="px-8 py-4 bg-red-900/40 text-red-100 rounded-full font-serif text-xl border border-red-800/50 shadow-[0_0_20px_rgba(220,38,38,0.3)] animate-pulse"
              >
                Abrir surpresa
              </button>
            </motion.div>
          )}

          {step === 0 && (
            <motion.div key="heart" className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
              <HeartAnimation onComplete={nextStep} />
            </motion.div>
          )}
          
          {step === 1 && (
            <motion.div key="intro" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <IntroMsg onNext={nextStep} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="quiz" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuizStep onComplete={nextStep} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="interstitial" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Interstitial onNext={nextStep} />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="final" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FinalStep />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
