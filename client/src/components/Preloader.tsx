import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="grain absolute inset-0" />
          
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0 border-2 border-neon-pink"
                style={{
                  boxShadow: "0 0 20px #FF00FF, inset 0 0 20px rgba(255, 0, 255, 0.1)",
                }}
                animate={{
                  rotate: 360,
                  borderRadius: ["10%", "30%", "50%", "30%", "10%"],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  borderRadius: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.div
                className="absolute inset-4 border-2 border-neon-blue"
                style={{
                  boxShadow: "0 0 15px #00FFFF, inset 0 0 15px rgba(0, 255, 255, 0.1)",
                }}
                animate={{
                  rotate: -360,
                  borderRadius: ["50%", "30%", "10%", "30%", "50%"],
                }}
                transition={{
                  rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
                  borderRadius: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.div
                className="absolute inset-8 border-2 border-neon-green"
                style={{
                  boxShadow: "0 0 10px #39FF14, inset 0 0 10px rgba(57, 255, 20, 0.1)",
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h2
              className="font-display text-2xl md:text-3xl text-white mb-4 tracking-widest uppercase glitch-text"
              data-text="LOADING"
              animate={{
                textShadow: [
                  "0 0 10px #FF00FF, 0 0 20px #FF00FF",
                  "0 0 15px #00FFFF, 0 0 30px #00FFFF",
                  "0 0 10px #39FF14, 0 0 20px #39FF14",
                  "0 0 10px #FF00FF, 0 0 20px #FF00FF",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LOADING
            </motion.h2>
            
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FF00FF, #00FFFF, #39FF14)",
                  boxShadow: "0 0 20px #FF00FF",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.p
              className="font-mono text-neon-green text-xl mt-4"
              style={{ textShadow: "0 0 10px #39FF14" }}
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </motion.div>

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ["#FF00FF", "#00FFFF", "#39FF14"][i % 3],
                boxShadow: `0 0 10px ${["#FF00FF", "#00FFFF", "#39FF14"][i % 3]}`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
