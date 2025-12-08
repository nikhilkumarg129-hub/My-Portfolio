import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/three/Scene";
import gsap from "gsap";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.2,
        }
      );
    }
  }, []);

  const titleLetters = "NIKHIL GUPTA".split("");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />
      
      <div className="grain absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span
            className="inline-block font-mono text-neon-green text-sm md:text-base uppercase tracking-[0.3em]"
            style={{ textShadow: "0 0 10px #39FF14" }}
          >
            Welcome to my portfolio
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wider"
          style={{ perspective: "1000px" }}
          data-testid="text-hero-name"
        >
          {titleLetters.map((letter, index) => (
            <span
              key={index}
              className="inline-block text-white hover:text-neon-pink transition-colors duration-200"
              style={{
                textShadow: "0 0 30px rgba(255, 0, 255, 0.5)",
                transformStyle: "preserve-3d",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <motion.p
          ref={subtitleRef}
          className="font-display text-lg sm:text-xl md:text-2xl text-neon-green uppercase tracking-[0.2em] mb-8"
          style={{ textShadow: "0 0 20px #39FF14" }}
          data-testid="text-hero-title"
        >
          <span className="inline-block">Frontend Developer</span>
          <span className="mx-3 text-neon-pink">|</span>
          <span className="inline-block">Creative Web Designer</span>
          <span className="mx-3 text-neon-pink">|</span>
          <span className="inline-block">Gen-Z Coder</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Crafting immersive digital experiences with cutting-edge web technologies.
          Specializing in 3D graphics, smooth animations, and pixel-perfect interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="group font-display uppercase tracking-wider bg-neon-pink hover:bg-neon-pink/90 text-white border-none px-8 py-6 text-base"
              style={{
                boxShadow: "0 0 30px rgba(255, 0, 255, 0.5)",
              }}
              data-testid="button-view-projects"
            >
              View Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="font-display uppercase tracking-wider border-neon-blue text-neon-blue hover:bg-neon-blue/10 px-8 py-6 text-base"
              style={{
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
              }}
              data-testid="button-contact"
            >
              Contact Me
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-neon-blue cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <ChevronDown className="w-8 h-8" style={{ filter: "drop-shadow(0 0 10px #00FFFF)" }} />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
