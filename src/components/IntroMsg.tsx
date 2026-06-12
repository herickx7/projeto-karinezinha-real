import { motion } from 'motion/react';
import { useEffect } from 'react';

export function IntroMsg({ onNext }: { onNext: () => void }) {
  // Let the user tap to continue, but also auto-advance after 5s just in case
  useEffect(() => {
    const t = setTimeout(onNext, 6000);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div 
      className="h-full bg-neutral-950 flex items-center justify-center p-8 text-center cursor-pointer relative" 
      onClick={onNext}
    >
       <motion.h1 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="font-serif text-4xl text-red-600 italic leading-snug"
       >
         vamos ver se você conhece a gente...
       </motion.h1>
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2 }}
         className="absolute bottom-10 left-0 right-0 flex justify-center pb-8"
       >
         <div className="text-red-800/80 animate-pulse text-sm font-sans tracking-wide">
           toque na tela para começar
         </div>
       </motion.div>
    </div>
  );
}
