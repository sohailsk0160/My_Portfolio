"use client";

import React, { useState, useEffect, useRef } from "react";

interface LogLine {
  text: string;
  type: "command" | "system" | "success" | "error" | "output";
}

export default function Terminal() {
  const [history, setHistory] = useState<LogLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const initialSequence = [
    { text: "ssh guest@sohail.shaikh.dev", type: "command" },
    { text: "Connecting to secure backend server in Mumbai, IN...", type: "system" },
    { text: "Connection established. SSH Session ID: 41221-MUM", type: "success" },
    { text: "cat developer_profile.json", type: "command" },
    {
      text: `{
  "name": "Mohammad Sohail Shaikh",
  "role": "Backend-Focused Software Developer",
  "focus": "Scalable APIs & AIML Digital Experiences",
  "status": "Engineering Student (Terna College)",
  "skills": ["Java", "SQL", "MERN Stack", "AWS", "Python"]
}`, type: "output"
    },
    { text: "systemctl status portfolio-engine.service", type: "command" },
    { text: "● portfolio-engine.service - Shaikh Backend Engine v1.0", type: "system" },
    { text: "   Active: active (running) - Listening on port 8080 (REST APIs Active)", type: "success" },
    { text: "Type 'help' to see list of custom commands.", type: "system" }
  ];

  // Auto-typing sequence
  useEffect(() => {
    setIsTyping(true);

    let currentIdx = 0;
    let timeout: NodeJS.Timeout;

    const writeNextLine = () => {
      if (currentIdx >= initialSequence.length) {
        setIsTyping(false);
        return;
      }

      const currentLine = initialSequence[currentIdx];

      if (!currentLine) {
        setIsTyping(false);
        return;
      }

      setHistory((prev) => [...prev, currentLine]);

      currentIdx++;

      timeout = setTimeout(
        writeNextLine,
        currentLine.type === "command" ? 800 : 400
      );
    };

    timeout = setTimeout(writeNextLine, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const cmd = inputValue.trim().toLowerCase();
    const newHistory = [...history, { text: `guest@sohail-shaikh:~$ ${inputValue}`, type: "command" as const }];

    setHistory(newHistory);
    setInputValue("");

    // Command Parser
    setTimeout(() => {
      switch (cmd) {
        case "help":
          setHistory((prev) => [
            ...prev,
            { text: "Available commands: 'skills', 'projects', 'contact', 'clear', 'about'", type: "system" }
          ]);
          break;
        case "clear":
          setHistory([]);
          break;
        case "about":
          setHistory((prev) => [
            ...prev,
            { text: "Mohammad Sohail Shaikh - IT Engineering Honours with AIML student. Passionate about designing robust backend architecture, writing performant SQL queries, and training ML algorithms.", type: "output" }
          ]);
          break;
        case "skills":
          setHistory((prev) => [
            ...prev,
            { text: "Languages: Java, SQL, JavaScript, Python, C, C++\nFrameworks: MERN (React, Node, Express, MongoDB)\nPlatforms: AWS, Git, GitHub, MySQL", type: "success" }
          ]);
          break;
        case "projects":
          setHistory((prev) => [
            ...prev,
            { text: "1. House Rental System (Java, SQL, Swing, AWS image backup)\n2. Yoga Pose Detection (Python, TensorFlow, Random Forest, OpenCV)", type: "success" }
          ]);
          break;
        case "contact":
          setHistory((prev) => [
            ...prev,
            { text: "Phone: +91 8850314221 | Email: sohailsk0160@gmail.com | Location: Mumbai", type: "success" }
          ]);
          break;
        default:
          setHistory((prev) => [
            ...prev,
            { text: `bash: command not found: ${cmd}. Type 'help' for options.`, type: "error" }
          ]);
      }
    }, 150);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden glass-panel-glow border border-neon-blue/30 text-left font-mono text-sm shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-cyber-dark/80 border-b border-white/5 select-none">
        <div className="flex space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
        </div>
        <div className="text-white/40 text-xs flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          shaikh-server-active
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-80 overflow-y-auto bg-cyber-dark/60 backdrop-blur-md flex flex-col space-y-2 select-text scrollbar-thin">
        {history.map((line, idx) => {
          let lineClass = "text-slate-300";
          if (line.type === "command") lineClass = "text-neon-cyan";
          if (line.type === "system") lineClass = "text-white/50";
          if (line.type === "success") lineClass = "text-green-400";
          if (line.type === "error") lineClass = "text-red-400";
          if (line.type === "output") lineClass = "text-neon-purple";

          return (
            <div key={idx} className={`${lineClass} whitespace-pre-wrap leading-relaxed`}>
              {line.type === "command" && line.text.startsWith("guest") ? (
                line.text
              ) : line.type === "command" ? (
                `guest@sohail-shaikh:~$ ${line.text}`
              ) : (
                line.text
              )}
            </div>
          );
        })}
        {isTyping && (
          <div className="text-white/40 flex items-center space-x-1.5">
            <span className="animate-pulse">System is writing profile</span>
            <span className="w-1.5 h-4 bg-white/40 animate-pulse" />
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input */}
      <form
        onSubmit={handleCommand}
        className="flex items-center px-4 py-2 border-t border-white/5 bg-cyber-dark/40"
      >
        <span className="text-neon-cyan mr-2 select-none">guest@sohail-shaikh:~$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isTyping}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-neon-blue focus:ring-0 placeholder-white/20 select-text"
          placeholder={isTyping ? "Initializing..." : "Type 'help'..."}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
