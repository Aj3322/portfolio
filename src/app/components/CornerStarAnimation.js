// components/CornerStarAnimation.js
"use client";
import { useEffect, useRef } from 'react';

const CornerStarAnimation = () => {
  const starRef = useRef(null);

  useEffect(() => {
    const star = starRef.current;
    if (!star) return;

    let position = 0;
    const duration = 4000; // Faster animation for corner-to-corner
    var startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      position = (elapsed / duration) * 100;

      if (position >= 100) {
        position = 0;
        startTime = performance.now();
      }

      // Calculate position along diagonal path
      const x = position;
      const y = position;

      // Create star effect with multiple gradients
      star.style.backgroundImage = `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(59, 130, 246, 0.8) 0%,
          rgba(59, 130, 246, 0.4) 20%,
          transparent 40%
        )
      `;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      ref={starRef}
      className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
      style={{
        zIndex: -1
      }}
    />
  );
};

export default CornerStarAnimation;