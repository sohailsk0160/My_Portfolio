"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, ChevronLeft, ChevronRight, Trophy, Sparkles } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  glowColor: string;
}

interface Achievement {
  title: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
}

interface CertificationsProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function Certifications({ currentTheme }: CertificationsProps) {
  const [activeSubTab, setActiveSubTab] = useState<"certs" | "awards">("certs");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const certificates: Certificate[] = [
    {
      title: "Fundamentals of Java",
      issuer: "Infosys",
      glowColor: "shadow-[0_0_15px_rgba(0,243,255,0.2)] border-neon-cyan/20",
    },
    {
      title: "Basics of Python",
      issuer: "Infosys",
      glowColor: "shadow-[0_0_15px_rgba(189,0,255,0.2)] border-neon-purple/20",
    },
    {
      title: "Basics of MongoDB",
      issuer: "MongoDB",
      glowColor: "shadow-[0_0_15px_rgba(255,0,127,0.2)] border-neon-pink/20",
    },
    {
      title: "Fundamentals of AI/ML",
      issuer: "AWS",
      glowColor: "shadow-[0_0_15px_rgba(250,204,21,0.2)] border-yellow-400/20",
    },
    {
      title: "Git & GitHub",
      issuer: "Online Webinar",
      glowColor: "shadow-[0_0_15px_rgba(59,130,246,0.2)] border-blue-500/20",
    },
    {
      title: "Internet of Things (IoT)",
      issuer: "Infosys",
      glowColor: "shadow-[0_0_15px_rgba(0,243,255,0.2)] border-neon-cyan/20",
    },
    {
      title: "Python Programming",
      issuer: "Udemy",
      glowColor: "shadow-[0_0_15px_rgba(189,0,255,0.2)] border-neon-purple/20",
    },
  ];

  const achievements: Achievement[] = [
    {
      title: "Diploma in Computer Engineering",
      metric: "90.24%",
      desc: "Achieved high marks throughout the Diploma program under MSBTE board.",
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Secondary School Certificate (SSC)",
      metric: "95.00%",
      desc: "Ranked among high scorers in the school district, excelling in technical studies.",
      icon: <Award className="w-5 h-5 text-neon-cyan" />,
    },
    {
      title: "Best Student of the Year",
      metric: "Primary School",
      desc: "Received accolades for academic excellence and leadership throughout primary schooling.",
      icon: <Sparkles className="w-5 h-5 text-neon-pink" />,
    },
    {
      title: "Technical Sciences Honours",
      metric: "Math & Science",
      desc: "Maintained top marks in computational arithmetic and diagnostic science courses.",
      icon: <ShieldCheck className="w-5 h-5 text-neon-purple" />,
    },
  ];

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section
      id="credentials"
      className="relative py-24 px-6 bg-gradient-to-b from-cyber-dark to-cyber-gray overflow-hidden"
    >
      <div className="absolute top-[20%] left-[5%] w-[250px] h-[250px] bg-neon-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Tab Headers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
          <div className="text-left">
            <h2 className="text-xs uppercase tracking-widest font-mono text-neon-cyan mb-2">
              06 // VERIFIED ACCOLADES
            </h2>
            <h3 className="text-3xl font-space font-bold text-white">
              Certifications & Achievements
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mt-4" />
          </div>

          {/* Toggle Tabs Buttons */}
          <div className="flex gap-2 bg-cyber-dark/80 p-1 rounded-lg border border-white/5 self-start">
            <button
              onClick={() => setActiveSubTab("certs")}
              className={`px-4 py-2 rounded-lg font-space text-xs tracking-wider transition-all duration-300
                ${activeSubTab === "certs" ? "bg-white/10 text-white font-semibold" : "text-slate-400 hover:text-white"}
              `}
            >
              Certifications
            </button>
            <button
              onClick={() => setActiveSubTab("awards")}
              className={`px-4 py-2 rounded-lg font-space text-xs tracking-wider transition-all duration-300
                ${activeSubTab === "awards" ? "bg-white/10 text-white font-semibold" : "text-slate-400 hover:text-white"}
              `}
            >
              Scholastic Achievements
            </button>
          </div>
        </div>

        {/* View 1: Certifications Carousel */}
        {activeSubTab === "certs" && (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden py-4 px-2">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${carouselIndex * 100}%)`,
                }}
              >
                {certificates.map((cert, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <div
                      className={`glass-panel p-8 rounded-xl border max-w-xl mx-auto flex flex-col justify-between min-h-[200px] transition-all duration-300 ${cert.glowColor}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest bg-neon-cyan/5 px-2 py-0.5 border border-neon-cyan/20 rounded">
                            Verified Core
                          </span>
                        </div>
                        <h4 className="text-xl font-space font-bold text-white mb-2">
                          {cert.title}
                        </h4>
                        <p className="text-slate-400 text-sm font-sans mb-6">
                          Issued by {cert.issuer}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <span className="text-slate-500 text-xs font-mono">Status: Completed / Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-colors interactive-hover"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {certificates.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                      ${carouselIndex === idx ? "w-4 bg-neon-cyan" : "bg-white/20"}
                    `}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-colors interactive-hover"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* View 2: Achievements Grid */}
        {activeSubTab === "awards" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-xl border border-white/5 hover:border-neon-pink/20 transition-all duration-300 flex flex-col justify-between group text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    {item.icon}
                  </div>
                  <span className="text-white/10 group-hover:text-white/20 text-3xl font-mono select-none">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1 mt-4">
                  <div
                    className={`text-2xl font-space font-bold tracking-tight
                      ${currentTheme === "cyberpunk" ? "text-neon-pink" : "text-green-400"}
                    `}
                  >
                    {item.metric}
                  </div>
                  <h4 className="text-white font-bold text-base">{item.title}</h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
