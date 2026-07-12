"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

interface EducationProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function Education({ currentTheme }: EducationProps) {
  const educationTimeline = [
    {
      degree: "B.E in Information Technology (Honours with AIML)",
      institution: "Terna Engineering College",
      duration: "Aug 2023 – May 2027 (Expected)",
      location: "Navi Mumbai, Maharashtra, India",
      details: "Focusing on Software Architecture, Core Java Development, Relational Databases (SQL), Machine Learning pipelines, and Computer Vision. Active collaborative software projects.",
      highlights: ["MERN/Java Web Projects", "AIML Specialization Courses", "REST API Development Projects"],
      gpa: "Pursuing",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Maharashtra State Board of Technical Education (MSBTE)",
      duration: "Aug 2020 – June 2023",
      location: "Mumbai, Maharashtra, India",
      details: "Comprehensive foundation in Computer Science core concepts including Data Structures & Algorithms (DSA), OOP paradigms, SQL Databases, operating systems, and computer hardware architectures.",
      highlights: ["Scored 90.24%", "Strong Programming Foundation", "Hardware & Assembly Systems"],
      gpa: "90.24%",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Maharashtra State Board",
      duration: "Completed June 2020",
      location: "Mumbai, Maharashtra, India",
      details: "Focused core study of Mathematics, Science, and English. Awarded Academic Accolades throughout primary education.",
      highlights: ["Scored 95.00% in SSC Board", "Best Student of the Year Award", "100/100 in Mathematics & Science elements"],
      gpa: "95.00%",
    },
  ];

  return (
    <section
      id="education"
      className="relative py-24 px-6 bg-gradient-to-b from-cyber-dark to-cyber-gray overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-[30%] right-[5%] w-[250px] h-[250px] bg-neon-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-xs uppercase tracking-widest font-mono text-neon-cyan mb-2">
            02 // ACADEMIC TIMELINE
          </h2>
          <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
            Education Journey
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4" />
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative border-l-2 border-white/5 pl-6 md:pl-10 ml-4 md:ml-12 space-y-12">
          {educationTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline dot badge icon */}
              <div
                className={`absolute -left-[45px] md:-left-[61px] top-1.5 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-500 z-10 bg-cyber-dark
                  ${idx === 0
                    ? currentTheme === "cyberpunk"
                      ? "border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                      : "border-green-400 text-green-400 shadow-[0_0_10px_rgba(0,255,102,0.4)]"
                    : "border-white/10 text-slate-400 group-hover:border-neon-purple/50 group-hover:text-neon-purple"
                  }
                `}
              >
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
              </div>

              {/* Timeline Card Content */}
              <div className="glass-panel p-6 md:p-8 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-md group-hover:translate-x-1">
                
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-lg md:text-xl font-space font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {item.degree}
                    </h4>
                    <span className="text-slate-300 font-medium text-sm md:text-base">
                      {item.institution}
                    </span>
                  </div>
                  
                  {/* Score Tag */}
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-mono border self-start md:self-center
                      ${currentTheme === "cyberpunk"
                        ? "border-neon-purple/30 bg-neon-purple/5 text-neon-pink"
                        : "border-green-500/30 bg-green-500/5 text-green-400"
                      }
                    `}
                  >
                    Grade: {item.gpa}
                  </span>
                </div>

                {/* Sub details row */}
                <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-mono mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm md:text-base mb-4 leading-relaxed">
                  {item.details}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {item.highlights.map((hl, hlIdx) => (
                    <span
                      key={hlIdx}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                    >
                      <Award className="w-3 h-3 text-neon-cyan" />
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
