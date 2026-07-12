"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Check if the device is mobile/tablet using touch media query
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const updateRing = () => {
      const ease = 0.15; // smooth delay factor
      
      const dx = mouseCoords.current.x - ringCoords.current.x;
      const dy = mouseCoords.current.y - ringCoords.current.y;
      
      ringCoords.current.x += dx * ease;
      ringCoords.current.y += dy * ease;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }
      
      requestAnimationFrame(updateRing);
    };

    const animationFrameId = requestAnimationFrame(updateRing);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Track hovered items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.classList.contains("interactive-hover");
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Small center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-cyan z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-screen"
        style={{ willChange: "transform" }}
      />
      {/* Outer glowing trail ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-neon-blue z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-screen transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,243,255,0.4)]
          ${isHovered ? "w-12 h-12 bg-neon-purple/20 border-neon-purple shadow-[0_0_15px_rgba(189,0,255,0.6)]" : "w-6 h-6"}
          ${isClicking ? "scale-75 bg-neon-pink/30 border-neon-pink shadow-[0_0_20px_rgba(255,0,127,0.8)]" : "scale-100"}
        `}
      />
    </>
  );
}
