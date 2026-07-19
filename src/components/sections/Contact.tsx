"use client";

import React, { useState, useEffect } from "react";
import { Phone, Mail, Send, Check, X, Loader } from "lucide-react";

interface ContactProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function Contact({ currentTheme }: ContactProps) {
  // Real contact coordinates — revealed only after OTP verification
  const REAL_PHONE = "8850314221";
  const REAL_EMAIL = "sohailsk0160@gmail.com";
  const REAL_WHATSAPP = "8850314221";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${REAL_EMAIL}`;

  // Reveal ~25% of a phone number, mask the rest (hide 75%)
  const maskPhone = (num: string) => {
    const visible = Math.ceil(num.length * 0.25); // keep first 25%
    return num.slice(0, visible) + "•".repeat(num.length - visible);
  };

  // Reveal ~25% of an email, mask the rest (hide 75%)
  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    const visible = Math.max(1, Math.ceil(local.length * 0.25));
    const maskedLocal = local.slice(0, visible) + "•".repeat(local.length - visible);
    const dotIndex = domain.lastIndexOf(".");
    const domainName = domain.slice(0, dotIndex);
    const tld = domain.slice(dotIndex);
    const maskedDomain = "•".repeat(domainName.length) + tld;
    return `${maskedLocal}@${maskedDomain}`;
  };
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    mobileNumber: "",
    subject: "", 
    message: "" 
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Countdown timer for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!form.mobileNumber) {
      setStatusMessage("Please enter your mobile number");
      return;
    }

    if (!/^\d{10}$/.test(form.mobileNumber)) {
      setStatusMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: form.mobileNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.error || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      setOtp("");
      setOtpVerified(false);
      setResendTimer(60);
      setStatusMessage(`OTP sent to +91${form.mobileNumber}`);
      
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
      console.error("Send OTP Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!otp) {
      setStatusMessage("Please enter the OTP");
      return;
    }

    setIsVerifying(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: form.mobileNumber, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.error || "Failed to verify OTP");
        return;
      }

      setOtpVerified(true);
      setStatusMessage("OTP verified successfully! ✓");
      setTimeout(() => setStatusMessage(""), 2000);
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
      console.error("Verify OTP Error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (!otpVerified) {
      setStatusMessage("Please verify your mobile number with OTP first");
      return;
    }

    // Build WhatsApp message
    const message = `*New Portfolio Contact*

*Name:*
${form.name}

*Email:*
${form.email}

*Mobile:*
+91${form.mobileNumber}

*Subject:*
${form.subject}

*Message:*
${form.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918850314221?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form
    setForm({ name: "", email: "", mobileNumber: "", subject: "", message: "" });
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setStatusMessage("");
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

              {!otpVerified && (
                <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300/80 bg-amber-500/5 border border-amber-500/20 rounded px-3 py-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Contact details are masked for privacy. Verify your mobile via OTP to reveal them fully.</span>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-white/5 font-mono text-xs md:text-sm">
                
                {/* Phone */}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-neon-cyan">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">PHONE DIRECT</span>
                    {otpVerified ? (
                      <a href={`tel:+91${REAL_PHONE}`} className="hover:underline hover:text-white">
                        +91 {REAL_PHONE}
                      </a>
                    ) : (
                      <span className="text-slate-400 select-none" title="Verify your mobile via OTP to reveal">
                        +91 {maskPhone(REAL_PHONE)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-neon-purple">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">EMAIL ENCRYPTED</span>
                    {otpVerified ? (
                      <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="hover:underline hover:text-white">
                        {REAL_EMAIL}
                      </a>
                    ) : (
                      <span className="text-slate-400 select-none" title="Verify your mobile via OTP to reveal">
                        {maskEmail(REAL_EMAIL)}
                      </span>
                    )}
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
                    {otpVerified ? (
                      <a href={`https://wa.me/91${REAL_WHATSAPP}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-white">
                        {REAL_WHATSAPP}
                      </a>
                    ) : (
                      <span className="text-slate-400 select-none" title="Verify your mobile via OTP to reveal">
                        {maskPhone(REAL_WHATSAPP)}
                      </span>
                    )}
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
                {/* Mobile Number - OTP Section */}
                <div className="space-y-3 p-4 border border-white/10 rounded-lg bg-white/[0.02]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="text-slate-400 text-xs font-mono uppercase">Mobile Number</label>
                      <div className="flex gap-2">
                        <span className="px-3 py-3 bg-cyber-dark/80 border border-white/5 rounded text-white text-sm flex items-center">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={form.mobileNumber}
                          onChange={(e) => setForm({ ...form, mobileNumber: e.target.value.replace(/\D/g, '') })}
                          className="flex-1 px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-cyan/50 focus:outline-none rounded text-white text-sm font-sans"
                          placeholder="1234567890"
                          disabled={otpVerified}
                        />
                      </div>
                    </div>

                    {/* Send OTP Button */}
                    <div className="space-y-1.5 flex flex-col justify-end">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpVerified || !form.mobileNumber || isLoading || resendTimer > 0}
                        className={`py-3 rounded-lg font-space text-xs font-semibold tracking-wider transition-all duration-300 border flex items-center justify-center gap-2
                          ${otpVerified
                            ? "bg-green-500/20 border-green-500/30 text-green-400 cursor-not-allowed"
                            : resendTimer > 0
                            ? "bg-slate-600/20 border-slate-600/30 text-slate-400 cursor-not-allowed"
                            : "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/50"
                          }
                        `}
                      >
                        {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                        {otpVerified
                          ? "✓ Verified"
                          : resendTimer > 0
                          ? `Resend in ${resendTimer}s`
                          : otpSent
                          ? "Resend OTP"
                          : "Send OTP"}
                      </button>
                    </div>
                  </div>

                  {/* OTP Input & Verification */}
                  {otpSent && !otpVerified && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                      {/* OTP Input */}
                      <div className="space-y-1.5">
                        <label className="text-slate-400 text-xs font-mono uppercase">Enter OTP</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-purple/50 focus:outline-none rounded text-white text-sm font-mono tracking-widest text-center"
                          placeholder="000000"
                        />
                      </div>

                      {/* Verify Button */}
                      <div className="space-y-1.5 flex flex-col justify-end">
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={!otp || isVerifying}
                          className={`py-3 rounded-lg font-space text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border
                            ${!otp || isVerifying
                              ? "bg-neon-purple/5 border-neon-purple/20 text-neon-purple/50 cursor-not-allowed"
                              : "bg-neon-purple/10 border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 hover:border-neon-purple/50"
                            }
                          `}
                        >
                          {isVerifying ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              Verify OTP
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Status Message */}
                  {statusMessage && (
                    <div className={`text-xs font-mono p-2 rounded border-l-2 flex items-center gap-2
                      ${statusMessage.includes("✓") || statusMessage.includes("successfully")
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : "bg-amber-500/10 border-amber-500 text-amber-300"
                      }
                    `}>
                      {statusMessage.includes("✓") || statusMessage.includes("successfully") ? (
                        <Check className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span>{statusMessage}</span>
                    </div>
                  )}
                </div>

                {/* Name and Email */}
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
                  disabled={!otpVerified}
                  className={`w-full py-3.5 rounded-lg font-space text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border interactive-hover
                    ${!otpVerified
                      ? "bg-gray-600 border-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                      : currentTheme === "cyberpunk"
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple border-transparent text-white shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                      : "bg-gradient-to-r from-green-500 to-neon-cyan border-transparent text-cyber-dark shadow-[0_0_10px_rgba(0,255,102,0.2)] hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]"
                    }
                  `}
                >
                  <Send className="w-4 h-4" />
                  {!otpVerified ? "Verify OTP to Send" : "Send Message"}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
