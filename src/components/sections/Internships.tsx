"use client";

import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, Send, Bug, BarChart, CheckCircle2 } from "lucide-react";

interface Internship {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  skills: string[];
  responsibilities: string[];
}

interface BugTicket {
  id: string;
  issue: string;
  severity: "High" | "Medium" | "Low";
  status: "Open" | "Retesting" | "Resolved";
}

interface InternshipsProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function Internships({ currentTheme }: InternshipsProps) {
  const [activeTab, setActiveTab] = useState<string>("qa");
  
  // QA Interactive Console States
  const [qaDashboardTab, setQaDashboardTab] = useState<"api" | "bugs">("api");
  const [apiEndpoint, setApiEndpoint] = useState("GET /api/v1/wealth/portfolio");
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  
  const [bugTickets, setBugTickets] = useState<BugTicket[]>([
    { id: "NW-401", issue: "Database transaction timeout during high-load concurrent execution", severity: "High", status: "Open" },
    { id: "NW-408", issue: "Postman API response missing CORS header on staging endpoint", severity: "Medium", status: "Open" },
    { id: "NW-415", issue: "Mobile profile page display glitch on tablet screen resolutions", severity: "Low", status: "Resolved" },
  ]);

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

  // API tester send trigger
  const runApiTest = () => {
    setApiLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiLoading(false);
      if (apiEndpoint.includes("portfolio")) {
        setApiResponse({
          status: 200,
          statusText: "OK",
          timeMs: 142,
          data: {
            portfolioId: "PF-99823",
            owner: "Mohammad Sohail Shaikh",
            assetsValue: "$124,500.00",
            status: "Synced with SQL Engine",
            lastCheck: "2026-07-12T01:06Z"
          }
        });
      } else {
        setApiResponse({
          status: 404,
          statusText: "Not Found",
          timeMs: 45,
          error: "Endpoint path configuration invalid"
        });
      }
    }, 800);
  };

  // Bug status retest trigger
  const retestBug = (id: string) => {
    setBugTickets(prev =>
      prev.map(bug => {
        if (bug.id === id) {
          return { ...bug, status: "Retesting" };
        }
        return bug;
      })
    );

    // Simulate resolution after retesting
    setTimeout(() => {
      setBugTickets(prev =>
        prev.map(bug => {
          if (bug.id === id) {
            return { ...bug, status: "Resolved" };
          }
          return bug;
        })
      );
    }, 1200);
  };

  const activeInternship = internships.find(i => i.id === activeTab) || internships[0];

  return (
    <section
      id="experience"
      className="relative py-24 px-6 bg-gradient-to-b from-cyber-gray to-cyber-dark overflow-hidden"
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
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4" />
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
                    ? currentTheme === "cyberpunk"
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
                      ${currentTheme === "cyberpunk" ? "bg-neon-cyan" : "bg-green-400"}
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
                          ? currentTheme === "cyberpunk"
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

              {/* Special Animated Dashboard ONLY for QA Internship */}
              {activeTab === "qa" && (
                <div className="mt-8 pt-6 border-t border-white/5 space-y-6">
                  
                  {/* QA Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono text-neon-cyan tracking-wider flex items-center gap-1.5">
                      <Bug className="w-4 h-4 text-neon-purple animate-bounce" />
                      Interactive QA Sandbox Simulator
                    </span>
                    
                    {/* Console Tab Switches */}
                    <div className="flex gap-2 bg-cyber-dark/80 p-1 rounded-lg border border-white/5">
                      <button
                        onClick={() => setQaDashboardTab("api")}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-300
                          ${qaDashboardTab === "api" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}
                        `}
                      >
                        API (Postman)
                      </button>
                      <button
                        onClick={() => setQaDashboardTab("bugs")}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-300
                          ${qaDashboardTab === "bugs" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}
                        `}
                      >
                        Bug Tracker
                      </button>
                    </div>
                  </div>

                  {/* Simulator Screen */}
                  <div className="bg-cyber-dark/80 rounded-xl border border-white/5 p-4 md:p-6 overflow-hidden">
                    
                    {/* View 1: Postman Console */}
                    {qaDashboardTab === "api" && (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={apiEndpoint}
                            onChange={(e) => setApiEndpoint(e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded font-mono text-xs text-white focus:outline-none focus:border-neon-cyan/50"
                          />
                          <button
                            onClick={runApiTest}
                            disabled={apiLoading}
                            className="px-4 py-2 rounded bg-neon-cyan/20 border border-neon-cyan/30 hover:bg-neon-cyan/30 text-neon-cyan text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                          >
                            <Send className="w-3.5 h-3.5" />
                            {apiLoading ? "Sending..." : "SEND"}
                          </button>
                        </div>

                        {/* Response display */}
                        <div className="bg-black/40 rounded p-4 border border-white/5 font-mono text-xs min-h-[120px] text-left overflow-x-auto text-green-400">
                          {apiLoading ? (
                            <div className="flex items-center gap-2 text-slate-400 py-4">
                              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
                              <span>Resolving SQL models & verifying headers...</span>
                            </div>
                          ) : apiResponse ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 border-b border-white/5">
                                <span>STATUS: <span className="text-green-400 font-bold">{apiResponse.status} {apiResponse.statusText}</span></span>
                                <span>TIME: <span className="text-neon-cyan">{apiResponse.timeMs}ms</span></span>
                              </div>
                              <pre className="text-neon-purple text-[11px] leading-relaxed">
                                {JSON.stringify(apiResponse.data, null, 2)}
                              </pre>
                            </div>
                          ) : (
                            <div className="text-slate-500 py-4 text-center">
                              Select endpoint and click SEND to run Postman query simulator.
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View 2: Bug Tickets */}
                    {qaDashboardTab === "bugs" && (
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-mono text-xs">
                            <thead>
                              <tr className="border-b border-white/5 text-slate-400">
                                <th className="pb-2">TICKET ID</th>
                                <th className="pb-2">DESCRIPTION</th>
                                <th className="pb-2">SEVERITY</th>
                                <th className="pb-2">STATUS</th>
                                <th className="pb-2 text-right">ACTION</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {bugTickets.map((bug) => (
                                <tr key={bug.id} className="text-slate-300">
                                  <td className="py-3 font-bold text-neon-cyan">{bug.id}</td>
                                  <td className="py-3 pr-4 max-w-xs truncate">{bug.issue}</td>
                                  <td className="py-3">
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[9px]
                                        ${bug.severity === "High" ? "bg-red-500/10 text-red-400 border border-red-500/20" : ""}
                                        ${bug.severity === "Medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : ""}
                                        ${bug.severity === "Low" ? "bg-slate-500/10 text-slate-400 border border-slate-500/20" : ""}
                                      `}
                                    >
                                      {bug.severity}
                                    </span>
                                  </td>
                                  <td className="py-3">
                                    <span
                                      className={`font-semibold
                                        ${bug.status === "Open" ? "text-red-400" : ""}
                                        ${bug.status === "Retesting" ? "text-yellow-400 animate-pulse" : ""}
                                        ${bug.status === "Resolved" ? "text-green-400" : ""}
                                      `}
                                    >
                                      {bug.status}
                                    </span>
                                  </td>
                                  <td className="py-3 text-right">
                                    {bug.status === "Open" ? (
                                      <button
                                        onClick={() => retestBug(bug.id)}
                                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-neon-cyan/20 border border-white/10 text-slate-300 hover:text-white transition-colors"
                                      >
                                        Retest
                                      </button>
                                    ) : bug.status === "Retesting" ? (
                                      <span className="text-[10px] text-slate-500">Checking DB...</span>
                                    ) : (
                                      <span className="text-green-500 flex items-center justify-end gap-1 font-semibold">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Verified
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QA Metric Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-left">
                      <span className="text-white/40 text-[10px] font-mono uppercase block">Test Cases Designed</span>
                      <span className="text-lg font-space font-bold text-white">340+</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-left">
                      <span className="text-white/40 text-[10px] font-mono uppercase block">Bugs Documented</span>
                      <span className="text-lg font-space font-bold text-white">45+</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-left">
                      <span className="text-white/40 text-[10px] font-mono uppercase block">API Endpoints Tested</span>
                      <span className="text-lg font-space font-bold text-white">80+</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-left">
                      <span className="text-white/40 text-[10px] font-mono uppercase block">Regression Cycles</span>
                      <span className="text-lg font-space font-bold text-white">12 Cycles</span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
