import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import gsap from "gsap";
import Card3D from "@/components/Card3D";
import TypingText from "@/components/TypingText";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288040-36cc9a68e148?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551276929-3f75211e0986?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2069&auto=format&fit=crop",
];

const PROJECTS = [
  {
    title: "E-commerce App",
    description: "Plataforma de comércio eletrônico completa com pagamentos integrados.",
    image: PROJECT_IMAGES[0],
    techs: ["Angular", "Spring", "PostgreSQL"],
    link: "#",
  },
  {
    title: "App de Gestão",
    description: "Sistema de gerenciamento corporativo com dashboards e relatórios.",
    image: PROJECT_IMAGES[1],
    techs: ["Flutter", "Java", "MySQL"],
    link: "#",
  },
];

const Index = () => {
  const { scrollYProgress } = useScroll();
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

  const aboutControls = useAnimation();
  const projectsControls = useAnimation();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    gsap.from(".hero-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Card3D />
      <motion.section style={{ opacity: heroOpacity, y: heroY }} className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-text">
            Olá, eu sou <span className="text-gradient font-bold"><TypingText text="João Silva" delay={500} /></span>
          </h1>
        </div>
      </motion.section>

      <section id="projetos" ref={projectsRef} className="py-20 px-4 section-transition">
        <motion.div
          initial="hidden"
          animate={projectsControls}
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container mx-auto max-w-4xl"
        >
          <h2 className="text-3xl font-bold mb-8">Meus Trabalhos Recentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                techs={project.techs}
                link={project.link}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="py-6 bg-white border-t">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} João Silva. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
