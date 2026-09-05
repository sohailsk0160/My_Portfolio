"use client";

import React, { useState, useEffect } from "react";
import CanvasParticles from "../components/ui/CanvasParticles";
import CustomCursor from "../components/ui/CustomCursor";
import BackToTop from "../components/ui/BackToTop";
import ChatBot from "../components/ui/ChatBot";
import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Education from "../components/sections/Education";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Internships from "../components/sections/Internships";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingLog, setLoadingLog] = useState("Initializing portfolio engine...");

  // Loading Screen Counter
  useEffect(() => {
    const logs = [
      { threshold: 0, text: "Initializing portfolio engine core..." },
      { threshold: 25, text: "Fetching Mohammad Sohail Shaikh profile nodes..." },
      { threshold: 55, text: "Establishing secure relational SQL DB linkages..." },
      { threshold: 75, text: "Starting AIML computer vision neural layers..." },
      { threshold: 90, text: "Securing SSH connection shell guest@sohail-shaikh.dev..." },
      { threshold: 100, text: "System connection stable. Access Granted." }
    ];

    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 250);
          return 100;
        }

        const nextVal = prev + 12;
        const finalVal = Math.min(nextVal, 100);

        const activeLog = [...logs].reverse().find((l) => finalVal >= l.threshold);
        if (activeLog) {
          setLoadingLog(activeLog.text);
        }

        if (finalVal >= 100) {
          setTimeout(() => setIsLoading(false), 250);
        }

        return finalVal;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative min-h-screen select-none ${theme === "light" ? "theme-light bg-[#f5f3ee]" : "bg-[#0b1220]"}`}
      data-theme={theme}
    >
      
      {/* Loading Loader Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-cyber-dark z-50 flex flex-col items-center justify-center p-6 text-left font-mono">
          <div className="w-full max-w-md space-y-6">
            
            {/* Header Title */}
            <div className="flex items-center justify-between text-xs text-white/40 pb-2 border-b border-white/5">
              <span>SECURITY PORT TERMINAL</span>
              <span>v2.10-ACTIVE</span>
            </div>

            {/* Simulated Shell Screen */}
            <div className="space-y-3">
              <div className="text-neon-cyan text-sm">
                guest@shaikh-security-core:~$ <span className="text-white animate-pulse">mount_portfolio_app</span>
              </div>
              <div className="text-slate-300 text-xs leading-relaxed min-h-[40px] whitespace-pre-wrap">
                {loadingLog}
              </div>
            </div>

            {/* Loader Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Loading Assets</span>
                <span className="font-semibold">{loadingPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-75 ease-out"
                  style={{
                    width: `${loadingPercent}%`,
                    background: theme === "dark" ? "#5aa9ff" : "#7dd3fc",
                    boxShadow: theme === "dark"
                      ? "0 0 10px rgba(90, 169, 255, 0.5)"
                      : "0 0 10px rgba(125, 211, 252, 0.5)"
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Trailing custom cursor ring */}
      <CustomCursor currentTheme={theme} />

      {/* Physics interactive background */}
      <CanvasParticles />

      {/* Main Pages Assembler */}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Navbar currentTheme={theme} setTheme={setTheme} />
        
        <main>
          <Hero currentTheme={theme} />
          <About currentTheme={theme} />
          <Education currentTheme={theme} />
          <Skills currentTheme={theme} />
          <Projects currentTheme={theme} />
          <Internships currentTheme={theme} />
          <Certifications currentTheme={theme} />
          <Contact currentTheme={theme} />
        </main>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5 bg-cyber-dark/80 backdrop-blur-md text-center text-xs text-slate-500 font-mono">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              &copy; 2025 Mohammad Sohail Shaikh. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span>Engineered in Mumbai</span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            </div>
          </div>
        </footer>

        <BackToTop />
        <ChatBot />
      </div>

    </div>
  );
}
