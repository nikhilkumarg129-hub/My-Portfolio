import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, SiThreedotjs, SiTailwindcss, SiPostgresql, SiGraphql, SiDocker, SiGit, SiFigma, SiAmazonwebservices } from "react-icons/si";
import { Card } from "@/components/ui/card";
import { BackgroundScene } from "@/components/three/Scene";
import { aboutBio, techStack } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, JSX.Element> = {
  react: <SiReact className="w-8 h-8" />,
  typescript: <SiTypescript className="w-8 h-8" />,
  nextjs: <SiNextdotjs className="w-8 h-8" />,
  nodejs: <SiNodedotjs className="w-8 h-8" />,
  threejs: <SiThreedotjs className="w-8 h-8" />,
  tailwind: <SiTailwindcss className="w-8 h-8" />,
  postgresql: <SiPostgresql className="w-8 h-8" />,
  graphql: <SiGraphql className="w-8 h-8" />,
  docker: <SiDocker className="w-8 h-8" />,
  aws: <SiAmazonwebservices className="w-8 h-8" />,
  git: <SiGit className="w-8 h-8" />,
  figma: <SiFigma className="w-8 h-8" />,
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".tech-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 80%",
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
          className="about-title text-center mb-16"
        >
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wider mb-4"
            style={{ textShadow: "0 0 30px rgba(255, 0, 255, 0.5)" }}
            data-testid="text-about-title"
          >
            About <span className="text-neon-pink">Me</span>
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full bg-neon-pink"
            style={{ boxShadow: "0 0 20px #FF00FF" }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-neon-pink relative"
                style={{
                  boxShadow: "0 0 40px #FF00FF, inset 0 0 40px rgba(255, 0, 255, 0.2)",
                }}
              >
                <div
                  className="absolute inset-0 holographic opacity-20"
                  style={{ mixBlendMode: "overlay" }}
                />
                <img
                  src="/profile.jpg"
                  alt="I'M NIKHIL KUMAR GUPTA"
                  className="w-full h-full object-cover"
                  data-testid="img-profile"
                />
              </div>

              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-neon-green"
                style={{ boxShadow: "0 0 20px #39FF14" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-neon-blue"
                style={{ boxShadow: "0 0 20px #00FFFF" }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />

              <motion.div
                className="absolute inset-0 rounded-full border-2 border-neon-blue opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ margin: "-20px", boxShadow: "0 0 15px #00FFFF" }}
              />
            </div>
          </motion.div>

          <motion.div
            ref={bioRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-pink/50"
                  style={{ background: "rgba(255, 0, 255, 0.1)" }}
                >
                  <MapPin className="w-4 h-4 text-neon-pink" />
                  <span className="text-sm text-white/80">San Francisco, CA</span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-green/50"
                  style={{ background: "rgba(57, 255, 20, 0.1)" }}
                >
                  <Briefcase className="w-4 h-4 text-neon-green" />
                  <span className="text-sm text-white/80">4+ Years Experience</span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-blue/50"
                  style={{ background: "rgba(0, 255, 255, 0.1)" }}
                >
                  <GraduationCap className="w-4 h-4 text-neon-blue" />
                  <span className="text-sm text-white/80">Stanford CS</span>
                </div>
              </div>

              <div className="text-white/80 leading-relaxed space-y-4" data-testid="text-bio">
                {aboutBio.split("\n\n").map((paragraph, index) => (
                  <p key={index}>
                    {index === 0 && (
                      <span className="text-4xl font-display text-neon-green float-left mr-2 leading-none">
                        {paragraph[0]}
                      </span>
                    )}
                    {index === 0 ? paragraph.slice(1) : paragraph}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Code2 className="w-5 h-5 text-neon-pink" />
                <span className="text-neon-pink font-display uppercase tracking-wider text-sm">
                  Available for freelance work
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2
            className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider text-center mb-12"
            style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
          >
            Tech <span className="text-neon-blue">Stack</span>
          </h2>

          <div className="tech-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <Card
                key={tech.name}
                className="tech-card group p-4 bg-card/50 border-white/10 hover:border-neon-pink/50 transition-all duration-300 flex flex-col items-center justify-center gap-3"
                style={{
                  boxShadow: "0 0 0 rgba(255, 0, 255, 0)",
                }}
                data-testid={`card-tech-${tech.name.toLowerCase()}`}
              >
                <div
                  className="text-white/70 group-hover:text-neon-pink transition-colors duration-300"
                  style={{
                    filter: "drop-shadow(0 0 0 transparent)",
                    transition: "filter 0.3s ease",
                  }}
                >
                  {iconMap[tech.icon] || <Code2 className="w-8 h-8" />}
                </div>
                <span className="text-xs text-white/60 group-hover:text-white/90 font-display uppercase tracking-wider transition-colors">
                  {tech.name}
                </span>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
