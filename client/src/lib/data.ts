import type { Project, SkillCategory, Experience, SocialLink } from "@shared/schema";

export const projects: Project[] = [
  {
    id: "1",
    title: "Neural Dashboard",
    description: "A real-time analytics dashboard with AI-powered insights, featuring dynamic data visualization and predictive analytics for business intelligence.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techStack: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/nikhilgupta",
    liveUrl: "https://neuraldash.demo.com",
    category: "Web App",
  },
  {
    id: "2",
    title: "CyberShop E-Commerce",
    description: "A futuristic e-commerce platform with immersive 3D product previews, AR try-on features, and seamless payment integration.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    techStack: ["Next.js", "Three.js", "Stripe", "Prisma", "TailwindCSS"],
    githubUrl: "https://github.com/nikhilgupta",
    liveUrl: "https://cybershop.demo.com",
    category: "E-Commerce",
  },
  {
    id: "3",
    title: "QuantumChat",
    description: "End-to-end encrypted messaging app with real-time translation, voice messages, and ephemeral content features.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    techStack: ["React Native", "Firebase", "WebRTC", "Node.js", "Socket.io"],
    githubUrl: "https://github.com/nikhilgupta",
    liveUrl: "https://quantumchat.demo.com",
    category: "Mobile App",
  },
  {
    id: "4",
    title: "MetaVerse Gallery",
    description: "An immersive NFT art gallery in 3D space where users can explore, purchase, and display digital art collections.",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&q=80",
    techStack: ["Three.js", "Web3.js", "Solidity", "IPFS", "React"],
    githubUrl: "https://github.com/nikhilgupta",
    liveUrl: "https://metagallery.demo.com",
    category: "Web3",
  },
  {
    id: "5",
    title: "DevFlow IDE",
    description: "A cloud-based collaborative code editor with AI code completion, real-time pair programming, and integrated deployment.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    techStack: ["Monaco Editor", "WebSocket", "Docker", "Kubernetes", "Go"],
    githubUrl: "https://github.com/nikhilgupta",
    liveUrl: "https://devflow.demo.com",
    category: "Developer Tool",
  },
  {
    id: "6",
    title: "SoundWave Music",
    description: "A music streaming platform with spatial audio, personalized playlists powered by ML, and social listening features.",
    image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&q=80",
    techStack: ["Vue.js", "Python", "TensorFlow", "Spotify API", "AWS"],
    githubUrl: "https://github.com/nikhilgupta",
    liveUrl: "https://soundwave.demo.com",
    category: "Web App",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 98 },
      { name: "Python", level: 85 },
      { name: "Go", level: 70 },
      { name: "Rust", level: 60 },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", level: 98 },
      { name: "Next.js", level: 95 },
      { name: "Node.js", level: 90 },
      { name: "Vue.js", level: 80 },
      { name: "Express", level: 88 },
    ],
  },
  {
    title: "3D & Animation",
    skills: [
      { name: "Three.js", level: 90 },
      { name: "GSAP", level: 92 },
      { name: "Framer Motion", level: 88 },
      { name: "WebGL", level: 75 },
      { name: "Blender", level: 65 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 82 },
      { name: "Figma", level: 88 },
      { name: "AWS", level: 78 },
      { name: "GraphQL", level: 85 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechNova Labs",
    location: "San Francisco, CA",
    startDate: "2023",
    endDate: "Present",
    description: [
      "Lead development of interactive 3D web experiences using Three.js and React",
      "Architected and implemented design system used across 5+ products",
      "Mentored team of 4 junior developers and conducted code reviews",
      "Improved site performance by 40% through optimization techniques",
    ],
    type: "work",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "DigitalCraft Agency",
    location: "New York, NY",
    startDate: "2021",
    endDate: "2023",
    description: [
      "Built responsive web applications for Fortune 500 clients",
      "Implemented complex animations using GSAP and CSS",
      "Collaborated with designers to create pixel-perfect interfaces",
      "Integrated RESTful APIs and managed state with Redux",
    ],
    type: "work",
  },
  {
    id: "3",
    title: "Junior Web Developer",
    company: "StartupX",
    location: "Remote",
    startDate: "2020",
    endDate: "2021",
    description: [
      "Developed and maintained React-based web applications",
      "Participated in agile sprints and daily standups",
      "Created reusable component libraries",
      "Wrote unit tests using Jest and React Testing Library",
    ],
    type: "work",
  },
  {
    id: "4",
    title: "Bachelor of Computer Science",
    company: "Stanford University",
    location: "Stanford, CA",
    startDate: "2016",
    endDate: "2020",
    description: [
      "Specialized in Human-Computer Interaction and Web Technologies",
      "GPA: 3.8/4.0 - Dean's List all semesters",
      "Led university's Web Development Club",
      "Capstone project: AR-based campus navigation system",
    ],
    type: "education",
  },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/nikhilgupta", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/nikhilgupta", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com/nikhilgupta", icon: "twitter" },
  { name: "Instagram", url: "https://instagram.com/nikhilgupta", icon: "instagram" },
  { name: "Dribbble", url: "https://dribbble.com/nikhilgupta", icon: "dribbble" },
];

export const aboutBio = `Hey there! I'm Nikhil, a passionate frontend developer and creative coder who lives at the intersection of design and technology. With over 4 years of experience crafting digital experiences, I specialize in building immersive, animated web applications that push the boundaries of what's possible in the browser.

My journey into web development started with a fascination for how websites could create emotional connections with users. Today, I channel that passion into creating experiences that are not just functional, but memorable. Whether it's a subtle micro-interaction or a full 3D scene, I believe every detail matters.

When I'm not coding, you'll find me exploring the latest web technologies, contributing to open-source projects, or experimenting with generative art. I'm always excited to collaborate on projects that challenge the status quo and create meaningful impact.`;

export const techStack = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Three.js", icon: "threejs" },
  { name: "TailwindCSS", icon: "tailwind" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "aws" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
];
