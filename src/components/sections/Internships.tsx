"use client";

import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";

interface Internship {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  skills: string[];
  responsibilities: string[];
}

interface InternshipsProps {
  currentTheme: "dark" | "light";
}

export default function Internships({ currentTheme }: InternshipsProps) {
  const [activeTab, setActiveTab] = useState<string>("qa");
  
  const internships: Internship[] = [
    {
      id: "qa",
      role: "QA Intern",
      company: "Neo Wealth and Asset Management",
      duration: "Dec 2025 – March 2026",
      location: "Mumbai, Maharashtra, India",
      skills: ["Manual Testing", "API Testing", "Regression Testing", "SQL Validation", "Postman", "Bug Tracking", "Test Case Design", "Quality Assurance", "Financial Software Testing"],
      responsibilities: [
        "Performed Manual and Regression testing for financial wealth management software systems.",
        "Conducted backend API testing using Postman, verifying status codes, payload structures, and response schemas.",
        "Designed and executed detailed test cases mapping user flow journeys and negative scenarios.",
        "Identified, documented, and tracked software bugs using system trackers, coordinating with backend teams.",
        "Validated SQL database operations, running queries to confirm database updates matched UI actions."
      ],
    },
    {
      id: "fullstack",
      role: "Full Stack Development Intern",
      company: "SmartED Innovations",
      duration: "March 2025 – June 2025",
      location: "Remote, India",
      skills: ["MERN Stack", "React.js", "Node.js", "MongoDB", "Express.js", "Optimization"],
      responsibilities: [
        "Developed responsive web modules for educational modules using React and Tailwind.",
        "Optimized frontend load times, refactoring bundle structures to reduce page rendering speeds.",
        "Created RESTful endpoints in Node.js, managing integrations between database structures and UI.",
      ],
    },
    {
      id: "android",
      role: "Android Development Intern",
      company: "Heuristic Academy",
      duration: "June 2023 – July 2023",
      location: "Mumbai, India",
      skills: ["Android Dev", "Java", "SQL Lite", "API Integration", "Mobile UI/UX"],
      responsibilities: [
        "Built responsive native Android application screens using XML and Java logic.",
        "Integrated SQL database storage and REST APIs to manage mobile network calls.",
        "Polished UI/UX animations and touch behaviors to improve core retention rates.",
      ],
    },
    {
      id: "hardware",
      role: "Computer Hardware Intern",
      company: "Salaam Bombay Foundation",
      duration: "June 2019 – July 2019",
      location: "Mumbai, India",
      skills: ["System Maintenance", "PC Assembly", "Hardware Troubleshooting", "Networks"],
      responsibilities: [
        "Assembled complete desktop systems from component layers.",
        "Troubleshot hardware defects, replacing cards, system components, and diagnostic boards.",
        "Configured software environments and validated local network access controls."
      ],
    },
  ];

  const activeInternship = internships.find(i => i.id === activeTab) || internships[0];

  return (
    <section
      id="experience"
      className="relative py-24 px-6 bg-[#111827] overflow-hidden"
    >
      <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-neon-cyan mb-2">
            05 // PROFESSIONAL HISTORY
          </h2>
          <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
            Internship Experiences
          </h3>
          <div className="w-16 h-1 bg-[#5aa9ff] mx-auto mt-4" />
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Selector Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {internships.map((intern) => (
              <button
                key={intern.id}
                onClick={() => setActiveTab(intern.id)}
                className={`p-5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group interactive-hover
                  ${activeTab === intern.id
                    ? currentTheme === "dark"
                      ? "border-neon-cyan bg-neon-cyan/5 text-white shadow-[0_0_15px_rgba(0,243,255,0.05)]"
                      : "border-green-500 bg-green-500/5 text-white shadow-[0_0_15px_rgba(0,255,102,0.05)]"
                    : "border-white/5 bg-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10"
                  }
                `}
              >
                {/* Visual side marker */}
                {activeTab === intern.id && (
                  <span
                    className={`absolute left-0 top-0 h-full w-[3px]
                      ${currentTheme === "dark" ? "bg-neon-cyan" : "bg-green-400"}
                    `}
                  />
                )}
                
                <h4 className="font-space font-bold text-base md:text-lg mb-1">
                  {intern.role}
                </h4>
                <div className="text-sm font-semibold opacity-90 mb-2">{intern.company}</div>
                <div className="flex items-center gap-1.5 text-xs font-mono opacity-60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{intern.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Active Console Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel p-8 rounded-xl border border-white/5 shadow-lg space-y-6">
              
              {/* Card Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-white/5">
                <div>
                  <h3 className="text-xl md:text-2xl font-space font-bold text-white">
                    {activeInternship.role}
                  </h3>
                  <span className="text-neon-cyan font-medium">{activeInternship.company}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono bg-white/5 px-3 py-1.5 rounded border border-white/5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeInternship.location}</span>
                </div>
              </div>

              {/* Skills tags list */}
              <div>
                <span className="text-white/40 text-xs font-mono uppercase block mb-3">Skills Applied</span>
                <div className="flex flex-wrap gap-2">
                  {activeInternship.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded text-xs font-mono border
                        ${activeTab === "qa"
                          ? currentTheme === "dark"
                            ? "border-neon-purple/20 bg-neon-purple/5 text-neon-pink"
                            : "border-green-500/20 bg-green-500/5 text-green-400"
                          : "border-white/5 bg-white/5 text-slate-300"
                        }
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Duties */}
              <div className="space-y-3">
                <span className="text-white/40 text-xs font-mono uppercase block">Key Responsibilities</span>
                <ul className="space-y-3">
                  {activeInternship.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm md:text-base leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0 mt-2" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
