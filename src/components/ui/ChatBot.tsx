"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
}

const QUICK_ACTIONS = [
  { label: "👋 About Me", query: "about" },
  { label: "💼 Projects", query: "projects" },
  { label: "🛠 Skills", query: "skills" },
  { label: "🎓 Education", query: "education" },
  { label: "💻 Internships", query: "internships" },
  { label: "🏆 Certificates", query: "certificates" },
  { label: "📄 Resume", query: "resume" },
];

function getBotReply(input: string): string {
  const q = input.toLowerCase();

  if (/(^|\s)(hi|hii|hello|hey|good morning|good afternoon|good evening)($|\s|!)/.test(q)) {
    return "Hello! 👋 I'm Sohail's portfolio assistant. Ask me about his skills, projects, education, internships, certificates, resume, or contact info — or use the quick buttons below!";
  }

  if (q.includes("about") || q.includes("who are you") || q.includes("who is sohail") || q.includes("yourself")) {
    return "Mohammad Sohail Shaikh is a Backend-Focused Software Developer from Mumbai, India 🇮🇳. He's an Information Technology engineering student (Honours in AIML) at Terna Engineering College, specializing in scalable APIs, Java, SQL databases, MERN stack, and AI/ML applications.";
  }

  if (q.includes("strongest") || q.includes("best project") || q.includes("favorite project")) {
    return "His strongest project is the House Rental System 🏠 — a complete backend-focused desktop app built with Java, SQL, Swing, JDBC and AWS S3. It features optimized database schemas, full CRUD operations, secure cloud backups, and multi-user transaction logs. Ask 'projects' to see all of them!";
  }

  if (q.includes("project")) {
    return "Sohail has built 4 featured projects:\n\n1. 🏠 House Rental System — Java, SQL, Swing, AWS S3, JDBC\n2. 🧘 Yoga Pose Detection — Python, OpenCV, TensorFlow, MediaPipe (real-time AI pose classification)\n3. 📧 Echo Box — Smart email management with Gmail API, Python & SQLite\n4. ❤️ Vital Either — IoT healthcare app with ECG sensors, React Native, Firebase & AI\n\nScroll to the Projects section to view detailed specs!";
  }

  if (q.includes("skill") || q.includes("technolog") || q.includes("tech stack") || q.includes("language")) {
    return "Sohail's core skills:\n\n💻 Languages: Java, SQL, JavaScript, Python, C, C++, PHP\n🌐 Web: React.js, Node.js, MERN Stack, HTML, CSS\n🗄️ Databases: MySQL, MongoDB\n⚙️ Core: OOP, DSA, REST APIs, Backend Development, Database Design\n☁️ Tools: Git, GitHub, AWS, Cloud, DevOps\n\nHis strongest areas are Java (90%) and backend development!";
  }

  if (q.includes("educat") || q.includes("study") || q.includes("college") || q.includes("degree") || q.includes("school")) {
    return "🎓 Education:\n\n1. B.E in Information Technology (Honours with AIML) — Terna Engineering College, Navi Mumbai (2023–2027, pursuing)\n2. Diploma in Computer Engineering — MSBTE, Mumbai (2020–2023) — scored 90.24%\n3. SSC — Maharashtra State Board (2020) — scored 95.00%, with 100/100 in Maths & Science!";
  }

  if (q.includes("intern") || q.includes("experience") || q.includes("work")) {
    return "💼 Internship experience:\n\n1. QA Intern @ Neo Wealth and Asset Management (Dec 2025 – Mar 2026, Mumbai) — manual & API testing, Postman, SQL validation for financial software\n2. Full Stack Development Intern @ SmartED Innovations (Mar 2025 – Jun 2025, Remote) — MERN stack development for educational modules";
  }

  if (q.includes("certif") || q.includes("course") || q.includes("award") || q.includes("achieve")) {
    return "🏆 Certifications:\n\n• Fundamentals of Java — Infosys\n• Basics of Python — Infosys\n• Basics of MongoDB — MongoDB\n• Fundamentals of AI/ML — AWS\n• Git & GitHub\n• Internet of Things (IoT) — Infosys\n• Python Programming — Udemy\n\nAchievements: 90.24% in Diploma, 95% in SSC, and Best Student of the Year award!";
  }

  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return "📄 You can download Sohail's resume using the 'Download Resume' button in the top Hero section. Quick note — you'll need to verify your mobile number with an OTP first (it keeps things secure!).";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire") || q.includes("whatsapp")) {
    return "📧 To reach Sohail, please use the secure contact form in the Contact section below. His personal details are kept private and are revealed there only after mobile OTP verification.";
  }

  if (q.includes("thank") || q.includes("thanks")) {
    return "You're welcome! 😊 Feel free to ask anything else about Sohail's portfolio.";
  }

  if (q.includes("bye") || q.includes("goodbye")) {
    return "Goodbye! 👋 Thanks for visiting Sohail's portfolio. Don't forget to check out his projects!";
  }

  return "I'm not sure about that 🤔 — I can only answer questions about Sohail's portfolio. Try asking about: skills, projects, education, internships, certificates, resume, or contact — or tap a quick button below!";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hello! 👋 I'm Sohail's portfolio assistant. How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isBotTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBotTyping) return;

    setMessages((prev) => [...prev, { text: trimmed, sender: "user" }]);
    setInputValue("");
    setIsBotTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getBotReply(trimmed), sender: "bot" }]);
      setIsBotTyping(false);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Floating toggle button (below back-to-top) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open portfolio assistant chat"
        className="fixed bottom-6 right-6 z-40 p-3 rounded-lg border border-neon-purple/30 bg-cyber-dark/80 backdrop-blur-md text-neon-purple shadow-[0_0_10px_rgba(189,0,255,0.3)] hover:bg-neon-purple/10 hover:border-neon-purple/60 hover:shadow-[0_0_15px_rgba(189,0,255,0.5)] transition-all duration-300 interactive-hover"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-[calc(100vw-3rem)] max-w-sm rounded-xl border border-white/10 bg-cyber-dark/95 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.03]">
            <div className="p-1.5 rounded bg-neon-purple/10 border border-neon-purple/30">
              <Bot className="w-4 h-4 text-neon-purple" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-space font-bold text-xs tracking-wide">
                SOHAIL&apos;S ASSISTANT
              </h4>
              <span className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                online
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatBodyRef} className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed whitespace-pre-wrap
                    ${msg.sender === "user"
                      ? "bg-neon-cyan/10 border border-neon-cyan/30 text-white rounded-br-none"
                      : "bg-white/5 border border-white/10 text-slate-300 rounded-bl-none"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-lg rounded-bl-none bg-white/5 border border-white/10 text-slate-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 border-t border-white/5 flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.query}
                onClick={() => sendMessage(action.query)}
                disabled={isBotTyping}
                className="px-2 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-[10px] font-mono hover:border-neon-cyan/40 hover:text-neon-cyan transition-all duration-200 disabled:opacity-50"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-white/5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about skills, projects..."
              className="flex-1 px-3 py-2 bg-cyber-dark/80 border border-white/10 focus:border-neon-cyan/50 focus:outline-none rounded text-white text-xs font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isBotTyping}
              className="p-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-200 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
