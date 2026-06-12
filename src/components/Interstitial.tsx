import { motion } from 'motion/react';

export function Interstitial({ onNext }: { onNext: () => void }) {
  return (
    <div 
      className="h-full bg-neutral-950 flex flex-col p-8 text-center cursor-pointer" 
      onClick={onNext}
    >
       <div className="flex-1 flex items-center justify-center">
         <motion.h1 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ type: "spring", stiffness: 100 }}
           className="font-serif text-4xl text-red-600 italic leading-snug z-10"
         >
           Hmmmm, acho que vc até conhece a gente ❤️
         </motion.h1>
       </div>
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5 }}
         className="h-16 flex items-end justify-center pb-4 z-10"
       >
         <div className="text-red-800/80 animate-pulse text-sm font-sans tracking-wide">
           toque na tela para continuar
         </div>
       </motion.div>
    </div>
  );
}
