import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundScene } from "@/components/three/Scene";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <BackgroundScene />
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="font-display text-8xl sm:text-9xl font-bold text-white mb-4 glitch-text"
            data-text="404"
            style={{ textShadow: "0 0 50px rgba(255, 0, 255, 0.5)" }}
            data-testid="text-404"
          >
            <span className="text-neon-pink">4</span>
            <span className="text-neon-blue">0</span>
            <span className="text-neon-green">4</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2
            className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider mb-4"
          >
            Page Not Found
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-8">
            Oops! The page you're looking for seems to have glitched out of existence. Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button
              size="lg"
              className="font-display uppercase tracking-wider bg-neon-pink hover:bg-neon-pink/90 text-white"
              style={{ boxShadow: "0 0 30px rgba(255, 0, 255, 0.5)" }}
              data-testid="button-go-home"
            >
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
          </Link>
          
          <Button
            size="lg"
            variant="outline"
            className="font-display uppercase tracking-wider border-neon-blue text-neon-blue hover:bg-neon-blue/10"
            onClick={() => window.history.back()}
            style={{ boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
            data-testid="button-go-back"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Go Back
          </Button>
        </motion.div>

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ["#FF00FF", "#00FFFF", "#39FF14"][i % 3],
              boxShadow: `0 0 15px ${["#FF00FF", "#00FFFF", "#39FF14"][i % 3]}`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
