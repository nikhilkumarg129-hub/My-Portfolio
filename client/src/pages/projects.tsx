import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundScene } from "@/components/three/Scene";
import { projects } from "@/lib/data";
import type { Project } from "@shared/schema";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={sectionRef} className="min-h-screen pt-24 pb-16 relative">
      <BackgroundScene />
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wider mb-4"
            style={{ textShadow: "0 0 30px rgba(0, 255, 255, 0.5)" }}
            data-testid="text-projects-title"
          >
            My <span className="text-neon-blue">Projects</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            A collection of my best work, showcasing creativity and technical expertise in web development.
          </p>
          <div
            className="w-24 h-1 mx-auto rounded-full bg-neon-blue"
            style={{ boxShadow: "0 0 20px #00FFFF" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className={`font-display uppercase tracking-wider text-xs ${
                filter === category
                  ? "bg-neon-pink text-white border-neon-pink"
                  : "border-white/20 text-white/70 hover:border-neon-pink hover:text-neon-pink"
              }`}
              style={filter === category ? { boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)" } : {}}
              data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="project-card"
              >
                <Card
                  className="group bg-card/50 border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:border-neon-pink/50"
                  onClick={() => setSelectedProject(project)}
                  style={{
                    boxShadow: "0 0 0 rgba(255, 0, 255, 0)",
                  }}
                  data-testid={`card-project-${project.id}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="scan-lines absolute inset-0 opacity-30" />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Badge
                      className="absolute top-3 right-3 bg-black/50 border-neon-green/50 text-neon-green text-xs"
                      data-testid={`badge-category-${project.id}`}
                    >
                      {project.category}
                    </Badge>
                  </div>

                  <div className="p-5">
                    <h3
                      className="font-display text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-neon-pink transition-colors"
                      data-testid={`text-project-title-${project.id}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-white/20 text-white/60 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline" className="border-white/20 text-white/60 text-xs">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-neon-blue group-hover:text-neon-pink transition-colors">
                      <span className="text-sm font-display uppercase tracking-wider">
                        View Details
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedProject(null)}
          >
            <div className="grain absolute inset-0 pointer-events-none" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card border border-white/10 rounded-lg"
              onClick={(e) => e.stopPropagation()}
              style={{ boxShadow: "0 0 60px rgba(255, 0, 255, 0.2)" }}
              data-testid="modal-project-detail"
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 z-10 text-white hover:text-neon-pink"
                onClick={() => setSelectedProject(null)}
                data-testid="button-close-modal"
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="relative aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="scan-lines absolute inset-0 opacity-20" />
              </div>

              <div className="p-6 sm:p-8">
                <Badge
                  className="mb-4 bg-neon-green/20 border-neon-green/50 text-neon-green"
                >
                  {selectedProject.category}
                </Badge>

                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4"
                  style={{ textShadow: "0 0 20px rgba(255, 0, 255, 0.5)" }}
                >
                  {selectedProject.title}
                </h2>

                <p className="text-white/70 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mb-8">
                  <h3 className="font-display text-sm uppercase tracking-wider text-neon-blue mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-neon-pink/50 text-neon-pink"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="font-display uppercase tracking-wider border-white/20 text-white hover:border-neon-pink hover:text-neon-pink"
                      data-testid="button-github"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="font-display uppercase tracking-wider bg-neon-pink hover:bg-neon-pink/90"
                      style={{ boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)" }}
                      data-testid="button-live-demo"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
