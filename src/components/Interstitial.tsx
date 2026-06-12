import { motion } from 'motion/react';

export function Interstitial({ onNext }: { onNext: () => void }) {
  return (
    <div 
      className="h-full bg-neutral-950 flex items-center justify-center p-8 text-center cursor-pointer relative" 
      onClick={onNext}
    >
       <motion.h1 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ type: "spring", stiffness: 100 }}
         className="font-serif text-4xl text-red-600 italic leading-snug z-10"
       >
         Hmmmm, acho que vc até conhece a gente ❤️
       </motion.h1>
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5 }}
         className="absolute bottom-10 left-0 right-0 flex justify-center pb-8 z-10"
       >
         <div className="text-red-800/80 animate-pulse text-sm font-sans tracking-wide">
           toque na tela para continuar
         </div>
       </motion.div>
    </div>
  );
}
