import { motion } from 'motion/react';
import { useState } from 'react';

const QUESTIONS = [
  {
    text: "qual foi o PRIMEIRO lugar que eu te vi?",
    options: [
      { prefix: "a)", text: "Educandario", isCorrect: true },
      { prefix: "b)", text: "Cesa", isCorrect: false },
      { prefix: "c)", text: "Circo", isCorrect: false },
      { prefix: "d)", text: "Praça", isCorrect: false },
    ]
  },
  {
    text: "qual foi a sua PRIMEIRA reação no meus storys?",
    options: [
      { prefix: "a)", text: "SIMMMM!!!!", isCorrect: false },
      { prefix: "b)", text: "Uma curtida.", isCorrect: false },
      { prefix: "c)", text: "principalmente de manhã", isCorrect: true },
      { prefix: "d)", text: "nossa vdd", isCorrect: false },
    ]
  },
  {
    text: "onde foi nosso first kiss?",
    options: [
      { prefix: "a)", text: "Ci", isCorrect: true },
      { prefix: "b)", text: "rc", isCorrect: true },
      { prefix: "c)", text: "o", isCorrect: true },
    ],
    anyCorrect: true
  }
];

export function QuizStep({ onComplete }: { onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);

  const q = QUESTIONS[currentIdx];

  const handleSelect = (idx: number, isCorrect: boolean) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);

    if (isCorrect || q.anyCorrect) {
      setTimeout(() => {
        setSelectedIdx(null);
        if (currentIdx < QUESTIONS.length - 1) {
          setCurrentIdx(curr => curr + 1);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setSelectedIdx(null);
      }, 800);
    }
  };

  return (
    <div className="h-full bg-neutral-950 flex flex-col justify-center p-6 relative overflow-hidden">
      <motion.div
         key={currentIdx}
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: -50 }}
         className="w-full max-w-sm mx-auto"
      >
        <div className="text-center mb-10">
           <span className="text-red-800/80 font-mono text-sm tracking-widest uppercase">
             Pergunta {currentIdx + 1} de {QUESTIONS.length}
           </span>
           <h2 className="font-serif text-3xl text-red-500 mt-4 leading-tight">
             {q.text}
           </h2>
        </div>

        <div className="space-y-4">
          {q.options.map((opt, i) => {
            let btnClass = "w-full p-4 rounded-2xl border-2 transition-all text-lg text-left shadow-sm font-sans flex items-center ";
            
            if (selectedIdx === i) {
               if (opt.isCorrect || q.anyCorrect) {
                 btnClass += "bg-emerald-950 border-emerald-500 text-emerald-400 scale-[1.02]";
               } else {
                 btnClass += "bg-neutral-800 border-neutral-600 text-neutral-400";
               }
            } else {
               btnClass += "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-red-900 active:scale-[0.98]";
            }
            
            return (
              <motion.button 
                key={i}
                onClick={() => handleSelect(i, opt.isCorrect)}
                animate={selectedIdx === i && isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={btnClass}
                disabled={selectedIdx !== null}
              >
                <span className="font-bold mr-3 min-w-[1.5rem] text-red-700/80">{opt.prefix}</span>
                <span>{opt.text}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
}
