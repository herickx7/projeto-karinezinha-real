import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Heart } from 'lucide-react';

export function HeartAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 6000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="h-full w-full bg-neutral-950 flex items-center justify-center overflow-hidden relative">
      <motion.div
        initial={{ top: "110%", y: "-50%", scale: 0.6, opacity: 0 }}
        animate={{ top: "-30%", y: "-50%", scale: 1.5, opacity: [0, 1, 1, 0] }}
        transition={{ 
          top: { duration: 6, ease: "linear" },
          scale: { duration: 6, ease: "easeInOut" },
          opacity: { duration: 6, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }
        }}
        className="drop-shadow-[0_0_80px_rgba(220,38,38,0.9)] absolute"
      >
        <Heart size={160} className="text-red-600" fill="currentColor" strokeWidth={0} />
      </motion.div>
    </div>
  );
}
