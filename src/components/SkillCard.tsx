
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  index: number;
}

const SkillCard = ({ name, icon, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="skill-card"
    >
      <div className="icon text-secondary">{icon}</div>
      <h3 className="font-medium text-sm">{name}</h3>
    </motion.div>
  );
};

export default SkillCard;
