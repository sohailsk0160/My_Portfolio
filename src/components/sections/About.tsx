"use client";

import React, { useEffect, useState, useRef } from "react";
import { BookOpen, Award, CheckCircle, Database } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);
      
      const nextCount = Math.floor(progressPercentage * end);
      setCount(nextCount);
      countRef.current = nextCount;

      if (progressPercentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={elementRef} className="font-space">
      {count}
      {suffix}
    </span>
  );
}

interface AboutProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function About({ currentTheme }: AboutProps) {
  const stats = [
    {
      label: "Projects Completed",
      value: 12,
      suffix: "+",
      icon: <CheckCircle className="w-5 h-5 text-neon-cyan" />,
      desc: "Web apps, ML modules & tools",
    },
    {
      label: "Tech Skills Learned",
      value: 20,
      suffix: "+",
      icon: <Database className="w-5 h-5 text-neon-blue" />,
      desc: "Languages, databases & tools",
    },
    {
      label: "Internships & Roles",
      value: 4,
      suffix: " Roles",
      icon: <BookOpen className="w-5 h-5 text-neon-purple" />,
      desc: "Full Stack, Android, QA & Hardware",
    },
    {
      label: "Academic Milestones",
      value: 95,
      suffix: "% Avg",
      icon: <Award className="w-5 h-5 text-neon-pink" />,
      desc: "High scoring diploma & school metrics",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-gradient-to-b from-cyber-gray to-cyber-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-neon-cyan mb-2">
            01 // PROFILE DETAILS
          </h2>
          <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
            About Mohammad Sohail Shaikh
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="glass-panel p-8 rounded-xl border border-white/5 space-y-6 flex-1 flex flex-col justify-center shadow-lg">
              <h4 className="text-xl font-space font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
                Backend-focused Developer & AIML Student
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans text-base md:text-lg">
                I am currently pursuing a Bachelor of Engineering in Information Technology (Honours with specialization in AIML) at Terna Engineering College, expected to graduate in May 2027.
              </p>
              <p className="text-slate-400 leading-relaxed font-sans text-sm md:text-base">
                I love programming in Java and Javascript, building scalable RESTful microservices, constructing database schema designs, and testing systems for edge cases. Combining my passion for backend engineering with artificial intelligence enables me to create digital interfaces that are not only performant and secure but also highly intelligent.
              </p>
              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-white/40 text-xs uppercase block font-mono">Location</span>
                  <span className="text-white text-sm font-space">Mumbai, MH, India</span>
                </div>
                <div>
                  <span className="text-white/40 text-xs uppercase block font-mono">Affiliation</span>
                  <span className="text-white text-sm font-space">Terna Eng College</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 flex flex-col justify-between group shadow-md hover:translate-y-[-4px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    {stat.icon}
                  </div>
                  <span className="text-white/10 group-hover:text-white/20 transition-colors text-3xl font-mono select-none">
                    0{idx + 1}
                  </span>
                </div>
                <div className="space-y-1">
                  <div
                    className={`text-3xl font-space font-bold tracking-tight
                      ${currentTheme === "cyberpunk" ? "text-neon-cyan" : "text-green-400"}
                    `}
                  >
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <h5 className="text-white font-semibold text-sm">{stat.label}</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
