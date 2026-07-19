"use client";

import React, { useState } from "react";
import { Cpu, Terminal, Database, Code, CheckSquare, Settings } from "lucide-react";

interface SkillProps {
  currentTheme: "cyberpunk" | "matrix";
}

interface Skill {
  name: string;
  level: number; // percentage
  category: "languages" | "web" | "databases" | "core" | "tools" | "soft";
  iconName?: string;
}

export default function Skills({ currentTheme }: SkillProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const categories = [
    { id: "languages", label: "Languages", icon: <Code className="w-4 h-4" /> },
    { id: "web", label: "Web Tech", icon: <Terminal className="w-4 h-4" /> },
    { id: "databases", label: "Databases", icon: <Database className="w-4 h-4" /> },
    { id: "core", label: "Core CS", icon: <Settings className="w-4 h-4" /> },
    { id: "tools", label: "Tools", icon: <CheckSquare className="w-4 h-4" /> },
    { id: "soft", label: "Soft Skills", icon: <Cpu className="w-4 h-4" /> },
  ];

  const skillsList: Skill[] = [
    // Programming Languages
    { name: "Java", level: 90, category: "languages" },
    { name: "SQL", level: 85, category: "languages" },
    { name: "JavaScript", level: 80, category: "languages" },
    { name: "Python", level: 75, category: "languages" },
    { name: "C", level: 70, category: "languages" },
    { name: "C++", level: 70, category: "languages" },
    { name: "PHP", level: 65, category: "languages" },
    
    // Web Tech
    { name: "React.js", level: 82, category: "web" },
    { name: "Node.js", level: 80, category: "web" },
    { name: "MERN Stack", level: 82, category: "web" },
    { name: "HTML", level: 90, category: "web" },
    { name: "CSS", level: 85, category: "web" },
    
    // Databases
    { name: "MySQL", level: 88, category: "databases" },
    { name: "MongoDB", level: 80, category: "databases" },
    
    // Core Concepts
    { name: "OOP (Object Oriented Programming)", level: 90, category: "core" },
    { name: "DSA (Data Structures & Algorithms - Java)", level: 82, category: "core" },
    { name: "REST APIs", level: 88, category: "core" },
    { name: "Backend Development", level: 88, category: "core" },
    { name: "Database Design", level: 85, category: "core" },
    
    // Tools & Platforms
    { name: "Git", level: 85, category: "tools" },
    { name: "GitHub", level: 88, category: "tools" },
    { name: "AWS", level: 70, category: "tools" },
    { name: "Cloud", level: 72, category: "tools" },
    { name: "DevOps", level: 74, category: "tools" },
    
    // Soft Skills
    { name: "Problem Solving", level: 90, category: "soft" },
    { name: "Communication", level: 85, category: "soft" },
    { name: "Teamwork", level: 88, category: "soft" },
  ];

  const filteredSkills = activeCategory
    ? skillsList.filter((s) => s.category === activeCategory)
    : [];

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "languages": return "text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5";
      case "web": return "text-neon-blue border-neon-blue/20 bg-neon-blue/5";
      case "databases": return "text-neon-purple border-neon-purple/20 bg-neon-purple/5";
      case "core": return "text-neon-pink border-neon-pink/20 bg-neon-pink/5";
      case "tools": return "text-yellow-400 border-yellow-400/20 bg-yellow-400/5";
      default: return "text-emerald-400 border-emerald-400/20 bg-emerald-400/5";
    }
  };

  return (
    <section
      id="skills"
      className="relative py-24 px-6 bg-gradient-to-b from-cyber-gray to-cyber-dark overflow-hidden"
    >
      <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-neon-cyan mb-2">
            03 // TECHNICAL INVENTORY
          </h2>
          <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
            Skills & Core Capabilities
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4" />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory((prev) => (prev === cat.id ? "" : cat.id))}
              className={`px-4 py-2 rounded-lg border font-space text-xs tracking-wider flex items-center gap-2 transition-all duration-300 interactive-hover
                ${activeCategory === cat.id
                  ? currentTheme === "cyberpunk"
                    ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)] font-semibold"
                    : "border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_10px_rgba(0,255,102,0.2)] font-semibold"
                  : "border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/10"
                }
              `}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Card Grid */}
        {activeCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-xl border border-white/5 hover:border-white/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-space text-base font-semibold text-white group-hover:text-neon-cyan transition-colors">
                    {skill.name}
                  </h4>
                  {/* Category Badge */}
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${getCategoryTheme(skill.category)}`}>
                    {skill.category}
                  </span>
                </div>

                {/* Progress Line Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Proficiency</span>
                    <span className="text-white font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        background:
                          currentTheme === "cyberpunk"
                            ? "linear-gradient(90deg, #bd00ff, #00f3ff)"
                            : "linear-gradient(90deg, #00ff66, #00ddff)",
                        boxShadow: currentTheme === "cyberpunk"
                          ? "0 0 8px rgba(0, 243, 255, 0.5)"
                          : "0 0 8px rgba(0, 255, 102, 0.5)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty prompt shown until a category is selected */
          <div className="glass-panel py-16 px-6 rounded-xl border border-dashed border-white/10 text-center">
            <Cpu className="w-10 h-10 mx-auto mb-4 text-neon-cyan/60" />
            <p className="font-space text-white text-lg font-semibold mb-1">
              Select a category to reveal skills
            </p>
            <p className="font-mono text-xs text-slate-400">
              Choose one of the filters above to view the related skills and proficiency levels.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
