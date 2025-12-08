import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundScene } from "@/components/three/Scene";
import { experiences } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 60%",
          },
        }
      );

      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50) },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 60%",
          },
        }
      );

      gsap.fromTo(
        ".timeline-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const workExperiences = experiences.filter((e) => e.type === "work");
  const educationExperiences = experiences.filter((e) => e.type === "education");

  return (
    <div ref={sectionRef} className="min-h-screen pt-24 pb-16 relative">
      <BackgroundScene />
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wider mb-4"
            style={{ textShadow: "0 0 30px rgba(255, 0, 255, 0.5)" }}
            data-testid="text-experience-title"
          >
            Experience & <span className="text-neon-pink">Education</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            My professional journey and academic background that shaped me into the developer I am today.
          </p>
          <div
            className="w-24 h-1 mx-auto rounded-full bg-neon-pink mt-6"
            style={{ boxShadow: "0 0 20px #FF00FF" }}
          />
        </motion.div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-10"
          >
            <div
              className="p-3 rounded-lg bg-neon-pink/20 border border-neon-pink/50"
              style={{ boxShadow: "0 0 20px rgba(255, 0, 255, 0.3)" }}
            >
              <Briefcase className="w-6 h-6 text-neon-pink" />
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider"
              style={{ textShadow: "0 0 15px rgba(255, 0, 255, 0.5)" }}
            >
              Work Experience
            </h2>
          </motion.div>

          <div className="timeline-container relative" ref={timelineRef}>
            <div
              className="timeline-line absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-neon-pink via-neon-blue to-neon-green"
              style={{
                boxShadow: "0 0 10px #FF00FF",
                transform: "translateX(-50%)",
              }}
            />

            {workExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                }`}
                data-testid={`timeline-item-${exp.id}`}
              >
                <div
                  className="timeline-node absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-neon-pink border-4 border-black"
                  style={{
                    boxShadow: "0 0 20px #FF00FF",
                    transform: "translate(-50%, 1.5rem)",
                  }}
                />

                <Card
                  className={`ml-16 md:ml-0 p-6 bg-card/50 border-white/10 hover:border-neon-pink/50 transition-all duration-300 group ${
                    index % 2 === 0 ? "" : "md:ml-auto"
                  }`}
                  style={{
                    boxShadow: "0 0 0 rgba(255, 0, 255, 0)",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge
                      className="bg-neon-green/20 border-neon-green/50 text-neon-green text-xs"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      {exp.startDate} - {exp.endDate}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/60 text-xs"
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      {exp.location}
                    </Badge>
                  </div>

                  <h3
                    className="font-display text-xl font-bold text-white uppercase tracking-wider mb-1 group-hover:text-neon-pink transition-colors"
                  >
                    {exp.title}
                  </h3>
                  <p className="text-neon-blue text-sm font-display uppercase tracking-wider mb-4">
                    {exp.company}
                  </p>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-neon-pink mt-1">&#8226;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mb-10"
          >
            <div
              className="p-3 rounded-lg bg-neon-blue/20 border border-neon-blue/50"
              style={{ boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
            >
              <GraduationCap className="w-6 h-6 text-neon-blue" />
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider"
              style={{ textShadow: "0 0 15px rgba(0, 255, 255, 0.5)" }}
            >
              Education
            </h2>
          </motion.div>

          <div className="timeline-container relative">
            <div
              className="timeline-line absolute left-8 md:left-1/2 top-0 w-0.5 bg-neon-blue"
              style={{
                boxShadow: "0 0 10px #00FFFF",
                transform: "translateX(-50%)",
              }}
            />

            {educationExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item relative mb-12 ${
                  index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                }`}
                data-testid={`timeline-item-${exp.id}`}
              >
                <div
                  className="timeline-node absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-neon-blue border-4 border-black"
                  style={{
                    boxShadow: "0 0 20px #00FFFF",
                    transform: "translate(-50%, 1.5rem)",
                  }}
                />

                <Card
                  className={`ml-16 md:ml-0 p-6 bg-card/50 border-white/10 hover:border-neon-blue/50 transition-all duration-300 group ${
                    index % 2 === 0 ? "" : "md:ml-auto"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge
                      className="bg-neon-green/20 border-neon-green/50 text-neon-green text-xs"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      {exp.startDate} - {exp.endDate}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/60 text-xs"
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      {exp.location}
                    </Badge>
                  </div>

                  <h3
                    className="font-display text-xl font-bold text-white uppercase tracking-wider mb-1 group-hover:text-neon-blue transition-colors"
                  >
                    {exp.title}
                  </h3>
                  <p className="text-neon-pink text-sm font-display uppercase tracking-wider mb-4">
                    {exp.company}
                  </p>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                        <span className="text-neon-blue mt-1">&#8226;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
