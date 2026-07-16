"use client";

import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, Download } from "lucide-react";
import Terminal from "../ui/Terminal";
import ResumeDownloadModal from "../ui/ResumeDownloadModal";

interface HeroProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function Hero({ currentTheme }: HeroProps) {
  const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=sohailsk0160@gmail.com";

  const roles = [
    "Backend & AI/ML Engineer",
    "MERN Stack Developer",
    "Java Developer",
    "AIML Enthusiast",
    "Software Engineer",
  ];

  const [roleIdx, setRoleIdx] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[roleIdx];
    const typingSpeed = isDeleting ? 40 : 100;

    const handleType = () => {
      if (!isDeleting) {
        setSubText(currentFullText.substring(0, subText.length + 1));
        if (subText.length + 1 === currentFullText.length) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
        } else {
          timer = setTimeout(handleType, typingSpeed);
        }
      } else {
        setSubText(currentFullText.substring(0, subText.length - 1));
        if (subText.length === 0) {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % roles.length);
        } else {
          timer = setTimeout(handleType, typingSpeed);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, roleIdx, roles]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPos = elRect - bodyRect;
      window.scrollTo({
        top: elPos - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-b from-cyber-dark to-cyber-gray"
    >
      {/* Background neon light blob overlays */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Heading Copy */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div
            className={`inline-block px-3 py-1.5 rounded-full border text-xs tracking-wider font-space uppercase
              ${currentTheme === "cyberpunk"
                ? "border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.1)]"
                : "border-green-500/30 bg-green-500/5 text-green-400 shadow-[0_0_8px_rgba(0,255,102,0.1)]"
              }
            `}
          >
            🚀 Open to exciting opportunities
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tight text-white leading-tight">
            Hi, I&apos;m{" "}
            <span
              className={`transition-all duration-500 ${
                currentTheme === "cyberpunk" ? "gradient-text-neon" : "gradient-text-cyan-blue"
              }`}
            >
              Mohammad Sohail
            </span>
          </h1>

          <div className="h-10 text-xl md:text-2xl font-mono text-slate-300">
            <span className="text-white">&gt; </span>
            <span className="terminal-cursor text-slate-100">{subText}</span>
          </div>

          <p className="text-slate-400 text-base md:text-lg max-w-lg font-sans leading-relaxed">
            I am a backend-focused developer and IT engineering student specializing in AIML. I build robust database services, scalable backend APIs, and intelligent data systems.
          </p>

          {/* Social icons */}
          <div className="flex items-center flex-wrap gap-3 text-slate-400">
            {/* Gmail */}
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 interactive-hover hover:border-neon-pink/30"
              title="sohailsk0160@gmail.com"
            >
              <Mail className="w-5 h-5" />
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mohammad-sohail-shaikh-537432291/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 interactive-hover hover:border-neon-purple/30"
              title="LinkedIn Profile"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/sohail_sk0160/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 interactive-hover hover:border-neon-pink/30"
              title="Instagram Profile"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="https://x.com/sohail_sk0160"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 interactive-hover hover:border-neon-cyan/30"
              title="X (Twitter) Profile"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/918850314221"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 interactive-hover hover:border-green-500/30"
              title="WhatsApp: 8850314221"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/sohailsk0160"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 interactive-hover hover:border-neon-cyan/30"
              title="GitHub Profile"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollToSection("projects")}
              className={`px-6 py-3 rounded-lg font-space text-sm font-semibold tracking-wide flex items-center justify-center gap-2 group transition-all duration-300 border interactive-hover
                ${currentTheme === "cyberpunk"
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple border-transparent text-white shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]"
                  : "bg-gradient-to-r from-green-500 to-neon-cyan border-transparent text-cyber-dark shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_20px_rgba(0,255,102,0.5)]"
                }
              `}
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 text-white font-space text-sm font-semibold tracking-wide bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 interactive-hover"
            >
              Contact Me
            </a>

            <button
              type="button"
              onClick={() => setShowResumeModal(true)}
              className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 text-white font-space text-sm font-semibold tracking-wide bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 interactive-hover"
            >
              <Download className="w-4 h-4" /> Download Resume
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Terminal */}
        <div className="lg:col-span-6 flex justify-center">
          <Terminal />
        </div>
      </div>

      <ResumeDownloadModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </section>
  );
}
