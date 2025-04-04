'use client';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpaceEffectsProps {
  children: ReactNode;
  className?: string;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

export function SpaceEffects({
  children,
  className,
  density = 'medium',
  animated = true,
}: SpaceEffectsProps) {
  // Number of stars based on density
  const starCount = {
    low: 50,
    medium: 100,
    high: 200,
  };
  
  // Generate random stars
  const stars = Array.from({ length: starCount[density] }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.3,
    animationDuration: Math.random() * 5 + 3,
  }));
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={cn(
              'absolute rounded-full bg-white',
              animated && 'animate-twinkle'
            )}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>
      
      {/* Nebula effects */}
      {animated && (
        <>
          <motion.div
            className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] z-0"
            animate={{
              x: [0, 10, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px] z-0"
            animate={{
              x: [0, -15, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
