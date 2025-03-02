
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techs: string[];
  link: string;
  index: number;
}

const ProjectCard = ({ title, description, image, techs, link, index }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate tilt based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    cardRef.current.style.transform = `
      perspective(1000px)
      rotateY(${x * 10}deg)
      rotateX(${y * -10}deg)
      translateZ(10px)
    `;
  };
  
  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `
      perspective(1000px)
      rotateY(0deg)
      rotateX(0deg)
      translateZ(0px)
    `;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1 + 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        resetTilt();
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="h-48 overflow-hidden">
        <motion.img 
          src={image} 
          alt={title}
          initial={{ scale: 1 }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="project-card-content">
        <div className="flex flex-wrap gap-2 mb-2">
          {techs.map((tech, i) => (
            <span key={i} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary"
        >
          Ver projeto
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
