"use client";

import React, { useState } from "react";
import { Phone, Mail, Send } from "lucide-react";

interface ContactProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function Contact({ currentTheme }: ContactProps) {
  const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=sohailsk0160@gmail.com";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Build WhatsApp message
    const message = `*New Portfolio Contact*

*Name:*
${form.name}

*Email:*
${form.email}

*Subject:*
${form.subject}

*Message:*
${form.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918850314221?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-gradient-to-b from-cyber-gray to-cyber-dark overflow-hidden"
    >
      {/* Background neon elements */}
      <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-neon-cyan mb-2">
            07 // SECURE COMMUNICATION
          </h2>
          <h3 className="text-3xl md:text-4xl font-space font-bold text-white">
            Get In Touch
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Contact info details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="glass-panel p-8 rounded-xl border border-white/5 space-y-6 flex-1 flex flex-col justify-center text-left">
              <h4 className="text-xl font-space font-bold text-white mb-2">
                Mohammad Sohail Shaikh
              </h4>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Have a project scope, system design proposal, database development task, or simply want to connect? Send a secure message or reach out via direct coordinates.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5 font-mono text-xs md:text-sm">
                
                {/* Phone */}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-neon-cyan">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">PHONE DIRECT</span>
                    <a href="tel:+918850314221" className="hover:underline hover:text-white">
                      +91 8850314221
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-neon-purple">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">EMAIL ENCRYPTED</span>
                    <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="hover:underline hover:text-white">
                      sohailsk0160@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-green-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">WHATSAPP</span>
                    <a href="https://wa.me/918850314221" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">
                      8850314221
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-neon-pink">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">LOCATION</span>
                    <span>Mumbai, Maharashtra, India</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Contact form panel */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-xl border border-white/5 shadow-lg text-left h-full flex flex-col justify-center">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-mono uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-cyan/50 focus:outline-none rounded text-white text-sm font-sans"
                      placeholder="John Doe"
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-mono uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-cyan/50 focus:outline-none rounded text-white text-sm font-sans"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-mono uppercase">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-cyan/50 focus:outline-none rounded text-white text-sm font-sans"
                    placeholder="Collaboration opportunity / Project scope"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-mono uppercase">Message Body</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-cyan/50 focus:outline-none rounded text-white text-sm font-sans resize-none"
                    placeholder="Hi Sohail, I would like to..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-lg font-space text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border interactive-hover
                    ${currentTheme === "cyberpunk"
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple border-transparent text-white shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                      : "bg-gradient-to-r from-green-500 to-neon-cyan border-transparent text-cyber-dark shadow-[0_0_10px_rgba(0,255,102,0.2)] hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]"
                    }
                  `}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
