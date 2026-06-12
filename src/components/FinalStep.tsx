import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export function FinalStep() {
  const [showFinal, setShowFinal] = useState(false);
  const [timePassed, setTimePassed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 09/09/2024
    const startDate = new Date(2024, 8, 9, 0, 0, 0); // Month is 0-indexed, so 8 is September
    
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimePassed({ days: d, hours: h, minutes: m, seconds: s });
    };
    
    tick(); // initial call
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const photos = [
    "https://i.ibb.co/TDqYyDsK/Whats-App-Image-2026-06-12-at-10-13-16.jpg",
    "https://i.ibb.co/wZ6FVkxC/Whats-App-Image-2026-06-12-at-10-13-18.jpg",
    "https://i.ibb.co/3y61VWf1/Whats-App-Image-2026-06-12-at-10-13-17-2.jpg",
    "https://i.ibb.co/9JK0TTb/Whats-App-Image-2026-06-12-at-10-13-17-1.jpg",
    "https://i.ibb.co/YTf5LD3M/Whats-App-Image-2026-06-12-at-10-13-17.jpg"
  ];

  return (
    <div className={`h-full bg-neutral-950 relative scroll-smooth flex flex-col justify-start min-h-0 ${showFinal ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar pb-24'}`}>
      <AnimatePresence mode="wait">
        {!showFinal ? (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }} 
            className="flex flex-col items-center pt-10"
          >
            {/* Carousel */}
            <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 px-10 pb-8 no-scrollbar scroll-pl-10">
              {photos.map((src, i) => (
                <motion.img 
                  key={i} 
                  src={src} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className={`w-64 h-80 object-cover rounded-3xl snap-center shrink-0 shadow-2xl border-[6px] border-neutral-900 ${
                    i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[3deg]'
                  }`} 
                  alt="Nós" 
                />
              ))}
            </div>

            {/* Counter widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 px-6 w-full max-w-sm mx-auto"
            >
              <div className="bg-neutral-900 p-6 rounded-[2rem] shadow-sm border border-neutral-800 text-center">
                <h2 className="font-serif text-2xl text-red-500 italic mb-4 font-semibold">sou feliz há</h2>
                <div className="flex justify-center gap-4 text-neutral-200 font-sans">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{timePassed.days}</span>
                    <span className="text-[10px] uppercase tracking-widest text-red-800 font-bold mt-1">Dias</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{timePassed.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase tracking-widest text-red-800 font-bold mt-1">Horas</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{timePassed.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase tracking-widest text-red-800 font-bold mt-1">Min</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{timePassed.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase tracking-widest text-red-800 font-bold mt-1">Seg</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text block */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10 font-sans text-[15px] leading-relaxed text-neutral-400 text-center px-8 flex flex-col gap-5"
            >
              <p>
                imagino que você esteja olhando pra telinha do seu celular agora comigo ao seu lado nesse dia dos namorados, exatamente do jeito que te vi quando me apaixonei por você, sorrindo.
              </p>
              <p>
                saiba que você é minha força muita das vezes pra ir atrás de alcançar objetivos em toda minha vida, e que cada segundo ao seu lado se torna o meu bem mais precioso.
              </p>
            </motion.div>

            {/* Heart Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, type: "spring" }}
              className="mt-16 text-red-600 flex justify-center w-full"
            >
              <motion.button 
                 onClick={() => setShowFinal(true)}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 animate={{ scale: [1, 1.08, 1] }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                 className="focus:outline-none drop-shadow-2xl bg-neutral-900 p-6 rounded-full shadow-[0_10px_40px_-10px_rgba(220,38,38,0.2)]"
              >
                 <Heart size={48} fill="currentColor" strokeWidth={1.5} />
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
           <motion.div 
             key="finalScreen"
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             transition={{ duration: 2.5, ease: "linear" }}
             className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center"
           >
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                className="font-serif text-[4.5rem] leading-[1.1] font-bold text-red-600 italic tracking-tight drop-shadow-[0_0_30px_rgba(220,38,38,0.6)] mb-12"
              >
                EU TE AMOOO!
              </motion.h1>
              <motion.img 
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 3, duration: 2.5, ease: "easeOut" }}
                src="https://i.ibb.co/TDqYyDsK/Whats-App-Image-2026-06-12-at-10-13-16.jpg" 
                className="w-72 h-80 object-cover rounded-2xl border-[6px] border-red-950 shadow-[0_0_80px_rgba(153,27,27,0.8)]" 
                alt="Final Love"
              />
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
