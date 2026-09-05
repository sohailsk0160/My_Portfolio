"use client";

import React, { useState, useEffect } from "react";
import { Award, ShieldCheck, ChevronLeft, ChevronRight, Trophy, Sparkles, X, ZoomIn } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  glowColor: string;
  imageUrl: string;
}

interface Achievement {
  title: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
}

interface CertificationsProps {
  currentTheme: "dark" | "light";
}

export default function Certifications({ currentTheme }: CertificationsProps) {
  const [activeSubTab, setActiveSubTab] = useState<"certs" | "awards">("certs");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      title: "Fundamentals of Java",
      issuer: "Infosys",
      glowColor: "shadow-[0_0_15px_rgba(0,243,255,0.2)] border-neon-cyan/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/Java+for+Beginners.jpg",
    },
    {
      title: "Basics of Python",
      issuer: "Infosys",
      glowColor: "shadow-[0_0_15px_rgba(189,0,255,0.2)] border-neon-purple/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/Basics+of+Python.jpg",
    },
    {
      title: "Basics of MongoDB",
      issuer: "MongoDB",
      glowColor: "shadow-[0_0_15px_rgba(255,0,127,0.2)] border-neon-pink/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/MongoDBBasics.jpg",
    },
    {
      title: "SQL and Relational Databases 101",
      issuer: "IBM",
      glowColor: "shadow-[0_0_15px_rgba(34,197,94,0.2)] border-green-400/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/SQl.jpg",
    },
    {
      title: "Fundamentals of AI/ML",
      issuer: "AWS",
      glowColor: "shadow-[0_0_15px_rgba(250,204,21,0.2)] border-yellow-400/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/AIML.jpg",
    },
    {
      title: "Git & GitHub",
      issuer: "Online Webinar",
      glowColor: "shadow-[0_0_15px_rgba(59,130,246,0.2)] border-blue-500/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/Git-GitHub.jpg",
    },
    {
      title: "Internet of Things (IoT)",
      issuer: "Infosys",
      glowColor: "shadow-[0_0_15px_rgba(0,243,255,0.2)] border-neon-cyan/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/Internet+of+Things.png",
    },
    {
      title: "Python Programming",
      issuer: "Udemy",
      glowColor: "shadow-[0_0_15px_rgba(189,0,255,0.2)] border-neon-purple/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/python.jpg",
    },
    {
      title: "Prompt Engineering for Everyone",
      issuer: "IBM",
      glowColor: "shadow-[0_0_15px_rgba(250,204,21,0.2)] border-yellow-400/20",
      imageUrl: "https://newimgabc.s3.eu-north-1.amazonaws.com/Prompt+Engineering.jpg",
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

  // Close the certificate modal on Escape and lock body scroll while open.
  useEffect(() => {
    if (!selectedCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <section
      id="credentials"
      className="relative py-24 px-6 bg-[#0b1220] overflow-hidden"
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
            <div className="w-16 h-1 bg-[#5aa9ff] mt-4" />
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
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className={`glass-panel p-8 rounded-xl border max-w-xl mx-auto w-full flex flex-col justify-between min-h-[200px] transition-all duration-300 text-left interactive-hover hover:scale-[1.02] cursor-pointer ${cert.glowColor}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest bg-neon-cyan/5 px-2 py-0.5 border border-neon-cyan/20 rounded">
                            Verified Core
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                            <ZoomIn className="w-3.5 h-3.5" /> View
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
                        <span className="text-neon-cyan text-xs font-mono">Click to view →</span>
                      </div>
                    </button>
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
                      ${currentTheme === "dark" ? "text-neon-pink" : "text-green-400"}
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

      {/* Certificate Image Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col glass-panel rounded-xl border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/10 bg-cyber-dark/80">
              <div className="min-w-0">
                <h4 className="text-white font-space font-bold text-sm sm:text-base truncate">
                  {selectedCert.title}
                </h4>
                <p className="text-slate-400 text-xs font-mono truncate">
                  Issued by {selectedCert.issuer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Certificate Image */}
            <div className="flex-1 overflow-auto bg-cyber-dark/50 flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedCert.imageUrl}
                alt={`${selectedCert.title} certificate`}
                className="max-w-full h-auto object-contain rounded"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-white/10 bg-cyber-dark/80 flex justify-end">
              <a
                href={selectedCert.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-neon-cyan hover:underline"
              >
                Open full image ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
