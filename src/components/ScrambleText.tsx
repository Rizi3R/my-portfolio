import React from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  hoverScramble?: boolean;
  speed?: number;
  revealDelay?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

/**
 * Clean, stable text renderer with zero layout shifting or stutter.
 * Renders semantic text immediately for seamless readability and accessibility.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
}) => {
  return (
    <Component className={className} aria-label={text}>
      {text}
    </Component>
  );
};
