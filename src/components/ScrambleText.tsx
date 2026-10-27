import React, { useState, useEffect, useRef } from 'react';
import { audioFx } from '../utils/audioFx';

interface ScrambleTextProps {
  text: string;
  className?: string;
  hoverScramble?: boolean;
  speed?: number;
  revealDelay?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const GLYPHS = '0123456789ABCDEF!@#$<>~*+/[]=_';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  hoverScramble = true,
  speed = 28,
  revealDelay = 3,
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    if (hoverScramble) {
      audioFx.playDecrypt();
    }

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
      });

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / revealDelay;
    }, speed);
  };

  useEffect(() => {
    // Initial mount scramble
    startScramble();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (hoverScramble && !isScrambling) {
      startScramble();
    }
  };

  return (
    <Component
      className={`inline-block ${className} cursor-default`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
};
