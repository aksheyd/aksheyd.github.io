'use client';
import React, { useState, useEffect } from 'react';

interface AnimateProps {
  text: string;
  delay: number;
}

const Animate: React.FC<AnimateProps> = ({ text, delay }: AnimateProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText: string) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex: number) => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};


export default Animate;