"use client";

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a card
      const target = e.target as HTMLElement;
      const isHoveringCard = target.closest('.cursor-pointer') !== null;
      setIsHovering(isHoveringCard);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseDown = () => {
      // Add clicked state handling if needed
    };

    const onMouseUp = () => {
      // Remove clicked state handling if needed
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-transform duration-100 ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
      }}
    >
      <div className={`
        rounded-full
        transition-all
        duration-200
        ${isHovering 
          ? 'w-12 h-12 border-2 border-blue-500/50 bg-blue-500/10' 
          : 'w-6 h-6 border border-white/30 bg-transparent'
        }
      `}></div>
    </div>
  );
} 