"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotsRef = useRef<Dot[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create dots
    const createDots = () => {
      const dots: Dot[] = [];
      // Increased density by reducing divisor from 15000 to 8000
      const numberOfDots = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < numberOfDots; i++) {
        // Add variety to dot sizes and opacities
        const radius = Math.random() * 1.5 + 0.5; // Random size between 0.5-2px
        const opacity = Math.random() * 0.1 + 0.1; // Random opacity between 0.1-0.2
        
        dots.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: 0,
          vy: 0,
          radius,
          opacity,
        });
      }
      
      dotsRef.current = dots;
    };

    createDots();

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      dotsRef.current.forEach((dot, index) => {
        // Mouse interaction
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Mouse influence radius

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const targetVx = Math.cos(angle) * force * -2;
          const targetVy = Math.sin(angle) * force * -2;
          
          dot.vx += (targetVx - dot.vx) * 0.02;
          dot.vy += (targetVy - dot.vy) * 0.02;
        }

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Friction
        dot.vx *= 0.95;
        dot.vy *= 0.95;

        // Bounce off edges with padding
        const padding = 50;
        if (dot.x < -padding) dot.x = window.innerWidth + padding;
        if (dot.x > window.innerWidth + padding) dot.x = -padding;
        if (dot.y < -padding) dot.y = window.innerHeight + padding;
        if (dot.y > window.innerHeight + padding) dot.y = -padding;

        // Draw dot with its unique opacity
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby dots
        dotsRef.current.slice(index + 1).forEach((otherDot) => {
          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) { // Increased connection radius from 60 to 80
            const opacity = (1 - distance / 80) * 0.15 * Math.min(dot.opacity, otherDot.opacity);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 bg-[#080808] pointer-events-none -z-10"
    />
  );
} 