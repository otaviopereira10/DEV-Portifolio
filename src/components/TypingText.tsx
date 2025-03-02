
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const TypingText = ({ text, delay = 0, className = "" }: TypingTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: number;
    
    // Initial delay before starting to type
    timeout = window.setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    let interval: number;
    
    if (isTyping && currentIndex < text.length) {
      interval = window.setInterval(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 60); // Speed of typing
    }

    return () => clearInterval(interval);
  }, [isTyping, currentIndex, text]);

  return (
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-block ${className}`}
    >
      {displayText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-5 bg-primary ml-0.5 animate-pulse"></span>
      )}
    </motion.span>
  );
};

export default TypingText;
