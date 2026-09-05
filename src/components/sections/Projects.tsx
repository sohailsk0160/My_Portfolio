"use client";

import React, { useState } from "react";
import { X, Database, Flame, Check } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: "java" | "aiml";
  tech: string[];
  desc: string;
  detailedDesc: string;
  features: string[];
  team: string;
  architecture: string;
}

interface ProjectsProps {
  currentTheme: "dark" | "light";
}

export default function Projects({ currentTheme }: ProjectsProps) {
  const [filter, setFilter] = useState<"all" | "java" | "aiml">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "rental",
      title: "House Rental System",
      category: "java",
      tech: ["Java", "SQL", "Swing", "AWS S3", "JDBC"],
      desc: "A complete backend-focused desktop housing management tool featuring relational database layouts, user CRUD management, and AWS storage backups.",
      detailedDesc: "Designed a comprehensive house rental management desktop application. The system handles property leasing agreements, tenant user records, and rent histories. Integrated with AWS S3 cloud buckets to securely manage backup operations of documents and tenant images, ensuring data consistency.",
      features: [
        "Full CRUD database operations for tenants and landlords",
        "Highly optimized SQL database schemas using indexes and foreign keys",
        "Desktop Swing graphic interface with system-style menus",
        "Secure cloud backups using AWS SDK integration for image store files",
        "Multi-user transaction logs to maintain booking safety"
      ],
      team: "4-member collaborative team project",
      architecture: "Java Desktop Client -> JDBC Driver -> MySQL Database Engine & AWS S3 Cloud Integration"
    },
    {
      id: "yoga",
      title: "Yoga Pose Detection",
      category: "aiml",
      tech: ["Python", "OpenCV", "TensorFlow", "Random Forest", "MediaPipe"],
      desc: "An AI computer vision application identifying yoga posture coordinates in real-time, matching posture structures using trained ML models.",
      detailedDesc: "Developed an AIML application that captures real-time video inputs via OpenCV, extracts body node coordinates using Google MediaPipe keypoints, and classifies posture classes through a trained Random Forest and TensorFlow model structure. Ideal for fitness assessment.",
      features: [
        "Real-time video body-keypoint node extraction (MediaPipe)",
        "Classification of 5+ classical yoga positions with high statistical accuracy",
        "Clean pipeline managing image noise reductions",
        "Random Forest and TensorFlow neural layer modeling",
        "Interactive metrics screen displaying correction hints to users"
      ],
      team: "3-member team research project",
      architecture: "Camera Stream Input -> OpenCV Frames -> MediaPipe Point Mapping -> Random Forest Classifier Node -> Client Visual UI Feedback"
    },
    {
      id: "echobox",
      title: "Echo Box",
      subtitle: "Smart Email Management System",
      category: "java",
      tech: ["Python", "Gmail API", "SQLite", "Automation"],
      desc: "A desktop-based intelligent email management system that automates Gmail operations, organizes emails, improves productivity, and simplifies email workflows using automation techniques.",
      detailedDesc: "A desktop-based intelligent email management system that automates Gmail operations, organizes emails, improves productivity, and simplifies email workflows using automation techniques. Leverages Gmail API for seamless integration and SQLite for efficient local data storage.",
      features: [
        "Automated Gmail operations using Gmail API",
        "Intelligent email categorization and organization",
        "SQLite database for local email metadata storage",
        "Productivity-enhancing workflow automation",
        "Desktop-based interface for streamlined email management"
      ],
      team: "Individual project",
      architecture: "Desktop Client -> Gmail API -> SQLite Local DB -> Automation Engine"
    },
    {
      id: "vitaleither",
      title: "Vital Either",
      subtitle: "Smart Healthcare System",
      category: "aiml",
      tech: ["React Native", "IoT", "ECG Sensors", "Firebase", "AI"],
      desc: "A hardware-integrated React Native healthcare application that uses ECG signals for real-time patient monitoring and enables live interaction between patients and doctors through the mobile application.",
      detailedDesc: "A hardware-integrated React Native healthcare application that uses ECG signals for real-time patient monitoring and enables live interaction between patients and doctors through the mobile application. Combines IoT sensor data with AI analysis for intelligent health insights.",
      features: [
        "Real-time ECG signal monitoring via IoT sensors",
        "Live patient-doctor interaction through mobile app",
        "Firebase backend for real-time data synchronization",
        "AI-powered health analysis and insights",
        "React Native cross-platform mobile application"
      ],
      team: "Team project",
      architecture: "ECG Sensors -> IoT Gateway -> Firebase -> React Native App -> AI Analysis Engine"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-[#0b1220] overflow-hidden"
    >
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-neon-cyan mb-2">
            04 // PROJECT PORTFOLIO
          </h2>
          <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
            Featured Systems & Apps
          </h3>
          <div className="w-16 h-1 bg-[#5aa9ff] mx-auto mt-4" />
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-space text-xs tracking-wider border transition-all duration-300 interactive-hover
              ${filter === "all"
                ? currentTheme === "dark"
                  ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                  : "border-green-500 bg-green-500/10 text-green-400"
                : "border-white/5 bg-white/5 text-slate-400 hover:text-white"
              }
            `}
          >
            All Work
          </button>
          <button
            onClick={() => setFilter("java")}
            className={`px-4 py-2 rounded-lg font-space text-xs tracking-wider border transition-all duration-300 interactive-hover
              ${filter === "java"
                ? currentTheme === "dark"
                  ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                  : "border-green-500 bg-green-500/10 text-green-400"
                : "border-white/5 bg-white/5 text-slate-400 hover:text-white"
              }
            `}
          >
            Java & DB
          </button>
          <button
            onClick={() => setFilter("aiml")}
            className={`px-4 py-2 rounded-lg font-space text-xs tracking-wider border transition-all duration-300 interactive-hover
              ${filter === "aiml"
                ? currentTheme === "dark"
                  ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                  : "border-green-500 bg-green-500/10 text-green-400"
                : "border-white/5 bg-white/5 text-slate-400 hover:text-white"
              }
            `}
          >
            AIML & Python
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel p-8 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:translate-y-[-4px]"
            >
              <div>
                {/* Tech Badge Header */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full border border-white/5 bg-white/5 text-slate-300 text-[10px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h4 className="text-xl md:text-2xl font-space font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h4>

                {project.subtitle && (
                  <p className="text-sm text-neon-cyan/70 font-mono mb-2">{project.subtitle}</p>
                )}

                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              <div>
                <div className="text-slate-400 text-xs font-mono mb-4 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-neon-purple" />
                  <span>{project.team}</span>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 text-white font-space text-xs font-semibold tracking-wider hover:bg-white/10 transition-all duration-300 text-center interactive-hover"
                >
                  View Specs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Specs Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-cyber-dark/80 backdrop-blur-xl transition-all duration-300 overflow-y-auto">
          <div className="relative w-full max-w-3xl glass-panel-glow border border-neon-blue/20 rounded-xl overflow-hidden shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors hover:border-white/15"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase font-mono text-neon-cyan tracking-wider block mb-2">
                  System Architecture Specs
                </span>
                <h3 className="text-2xl md:text-3xl font-space font-bold text-white">
                  {selectedProject.title}
                </h3>
                {selectedProject.subtitle && (
                  <p className="text-sm text-neon-cyan/70 font-mono mt-1">{selectedProject.subtitle}</p>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-white/40 text-xs font-mono uppercase block">Technical Architecture Map</span>
                <div className="p-3 bg-cyber-dark/60 border border-white/5 rounded-lg text-slate-300 font-mono text-xs flex items-center gap-2">
                  <Flame className="w-4 h-4 text-neon-pink shrink-0 animate-pulse" />
                  <span>{selectedProject.architecture}</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-white/40 text-xs font-mono uppercase block">Detailed Overview</span>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  {selectedProject.detailedDesc}
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-white/40 text-xs font-mono uppercase block">System Features</span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-slate-300 text-xs md:text-sm font-sans"
                    >
                      <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Info */}
              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center">
                <span className="text-slate-400 text-xs font-mono">
                  {selectedProject.team}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
