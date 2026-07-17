"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ShieldAlert, Cpu } from "lucide-react";
import VisitCounter from "@/components/ui/VisitCounter";

interface NavbarProps {
  currentTheme: "cyberpunk" | "matrix";
  setTheme: (theme: "cyberpunk" | "matrix") => void;
}

export default function Navbar({ currentTheme, setTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check if scrolled
      setScrolled(window.scrollY > 20);

      // Active section calculation
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleTheme = () => {
    setTheme(currentTheme === "cyberpunk" ? "matrix" : "cyberpunk");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "glass-navbar py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background:
            currentTheme === "cyberpunk"
              ? "linear-gradient(90deg, #00f3ff, #bd00ff)"
              : "linear-gradient(90deg, #00ff66, #00ddff)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center space-x-2 font-space text-xl font-bold tracking-wider"
          >
            <span
              className={`w-7 h-7 rounded flex items-center justify-center font-bold text-cyber-dark text-sm transition-all duration-300 ${
                currentTheme === "cyberpunk"
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                  : "bg-gradient-to-r from-green-400 to-neon-cyan shadow-[0_0_10px_rgba(0,255,102,0.5)]"
              }`}
            >
              S
            </span>
            <span className="text-white hover:text-neon-cyan transition-colors">
              SOHAIL<span className={currentTheme === "cyberpunk" ? "text-neon-purple" : "text-green-400"}>.DEV</span>
            </span>
          </a>

          {/* Live visit / unique device counter */}
          <VisitCounter currentTheme={currentTheme} />
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`font-space text-sm tracking-wide transition-all duration-300 relative py-1 hover:text-white
                ${activeSection === item.id 
                  ? currentTheme === "cyberpunk" ? "text-neon-cyan" : "text-green-400 font-medium" 
                  : "text-slate-400"
                }
              `}
            >
              {item.label}
              {activeSection === item.id && (
                <span
                  className="absolute bottom-0 left-0 w-full h-[1px] transition-all duration-300"
                  style={{
                    backgroundColor: currentTheme === "cyberpunk" ? "#00f3ff" : "#00ff66",
                    boxShadow: currentTheme === "cyberpunk" 
                      ? "0 0 8px #00f3ff" 
                      : "0 0 8px #00ff66"
                  }}
                />
              )}
            </a>
          ))}

          {/* Theme Selector Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border flex items-center justify-center transition-all duration-300 interactive-hover
              ${currentTheme === "cyberpunk" 
                ? "border-neon-purple/30 bg-neon-purple/5 text-neon-cyan hover:border-neon-cyan/80 shadow-[0_0_5px_rgba(189,0,255,0.1)]"
                : "border-green-500/30 bg-green-500/5 text-green-400 hover:border-green-400/80 shadow-[0_0_5px_rgba(0,255,102,0.1)]"
              }
            `}
            title="Toggle Visual Engine Core"
          >
            {currentTheme === "cyberpunk" ? (
              <Cpu className="w-4 h-4 animate-spin-slow" />
            ) : (
              <ShieldAlert className="w-4 h-4 animate-pulse" />
            )}
          </button>
        </nav>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border text-xs flex items-center justify-center transition-all duration-300
              ${currentTheme === "cyberpunk" 
                ? "border-neon-purple/30 text-neon-cyan" 
                : "border-green-500/30 text-green-400"
              }
            `}
          >
            {currentTheme === "cyberpunk" ? "CYBER" : "MATRIX"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-neon-cyan transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-cyber-dark/95 backdrop-blur-xl border-t border-white/5 z-30 transition-all duration-300 flex flex-col p-8 space-y-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`font-space text-lg tracking-wider text-left py-2 border-b border-white/5
                ${activeSection === item.id
                  ? currentTheme === "cyberpunk" ? "text-neon-cyan font-bold" : "text-green-400 font-bold"
                  : "text-slate-400"
                }
              `}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
