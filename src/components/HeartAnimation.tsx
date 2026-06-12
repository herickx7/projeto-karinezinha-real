import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Heart } from 'lucide-react';

export function HeartAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 8500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="h-full bg-neutral-950 flex items-center justify-center overflow-hidden relative">
      <motion.div
        initial={{ y: "100vh", scale: 0.6, opacity: 0 }}
        animate={{ y: "-100vh", scale: 1.5, opacity: [0, 1, 1, 0] }}
        transition={{ 
          duration: 8, 
          ease: "linear",
          opacity: { times: [0, 0.2, 0.8, 1], duration: 8 }
        }}
        className="drop-shadow-[0_0_80px_rgba(220,38,38,0.9)] absolute"
      >
        <Heart size={160} className="text-red-600" fill="currentColor" strokeWidth={0} />
      </motion.div>
    </div>
  );
}
