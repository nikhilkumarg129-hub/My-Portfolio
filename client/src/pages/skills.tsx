import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { BackgroundScene } from "@/components/three/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillRingProps {
  name: string;
  level: number;
  index: number;
  categoryIndex: number;
}

function SkillRing({ name, level, index, categoryIndex }: SkillRingProps) {
  const ringRef = useRef<SVGCircleElement>(null);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  useEffect(() => {
    if (ringRef.current) {
      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: offset,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: ringRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [circumference, offset, index]);

  const colors = [
    { stroke: "#FF00FF", glow: "0 0 20px #FF00FF" },
    { stroke: "#39FF14", glow: "0 0 20px #39FF14" },
    { stroke: "#00FFFF", glow: "0 0 20px #00FFFF" },
  ];
  const color = colors[categoryIndex % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="flex flex-col items-center group"
      data-testid={`skill-ring-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="6"
          />
          <circle
            ref={ringRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              filter: `drop-shadow(${color.glow})`,
              transition: "filter 0.3s ease",
            }}
            className="group-hover:brightness-125"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-xl sm:text-2xl font-bold text-white"
            style={{ textShadow: color.glow }}
          >
            {level}%
          </span>
        </div>
      </div>
      <span className="mt-3 text-sm text-white/80 font-display uppercase tracking-wider text-center">
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-title",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen pt-24 pb-16 relative">
      <BackgroundScene />
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wider mb-4"
            style={{ textShadow: "0 0 30px rgba(57, 255, 20, 0.5)" }}
            data-testid="text-skills-title"
          >
            My <span className="text-neon-green">Skills</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels across various technologies and tools.
          </p>
          <div
            className="w-24 h-1 mx-auto rounded-full bg-neon-green mt-6"
            style={{ boxShadow: "0 0 20px #39FF14" }}
          />
        </motion.div>

        <div className="skills-container space-y-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * categoryIndex }}
            >
              <h2
                className="category-title font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider mb-10 text-center sm:text-left"
                style={{
                  textShadow: `0 0 20px ${
                    ["#FF00FF", "#39FF14", "#00FFFF", "#FF00FF"][categoryIndex % 4]
                  }`,
                }}
              >
                <span
                  className={
                    categoryIndex === 0
                      ? "text-neon-pink"
                      : categoryIndex === 1
                      ? "text-neon-green"
                      : categoryIndex === 2
                      ? "text-neon-blue"
                      : "text-neon-pink"
                  }
                >
                  {category.title}
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                {category.skills.map((skill, index) => (
                  <SkillRing
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                    categoryIndex={categoryIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-white/40 text-sm font-mono">
            Always learning. Always growing. Always coding.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
