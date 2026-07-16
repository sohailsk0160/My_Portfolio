"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Loader, Download, ShieldCheck } from "lucide-react";

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeDownloadModal({ isOpen, onClose }: ResumeDownloadModalProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const resetState = () => {
    setMobileNumber("");
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setStatusMessage("");
    setIsLoading(false);
    setIsVerifying(false);
    setResendTimer(0);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSendOtp = async () => {
    if (!mobileNumber) {
      setStatusMessage("Please enter your mobile number");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setStatusMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: mobileNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.error || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      setOtp("");
      setResendTimer(60);
      setStatusMessage(`OTP sent to +91${mobileNumber}`);
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
      console.error("Send OTP Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
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
        body: JSON.stringify({ phoneNumber: mobileNumber, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.error || "Failed to verify OTP");
        return;
      }

      setOtpVerified(true);
      setStatusMessage("Verified! Click below to download ✓");
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
      console.error("Verify OTP Error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md glass-panel rounded-xl border border-white/10 bg-cyber-dark/95 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.7)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-neon-cyan" />
            <h3 className="text-white font-space font-bold text-sm tracking-wide">
              VERIFY TO DOWNLOAD RESUME
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-400 text-xs font-mono mb-6">
          Verify your mobile number with a one-time password to download the resume.
        </p>

        {/* Mobile Number */}
        <div className="space-y-1.5 mb-4">
          <label className="text-slate-400 text-xs font-mono uppercase">Mobile Number</label>
          <div className="flex gap-2">
            <span className="px-3 py-3 bg-cyber-dark/80 border border-white/5 rounded text-white text-sm flex items-center">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
              className="flex-1 px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-cyan/50 focus:outline-none rounded text-white text-sm font-sans"
              placeholder="1234567890"
              disabled={otpVerified}
            />
          </div>
        </div>

        {/* Send OTP Button */}
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={otpVerified || !mobileNumber || isLoading || resendTimer > 0}
          className={`w-full py-3 rounded-lg font-space text-xs font-semibold tracking-wider transition-all duration-300 border flex items-center justify-center gap-2 mb-4
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

        {/* OTP Input & Verify */}
        {otpSent && !otpVerified && (
          <div className="space-y-4 pt-4 border-t border-white/10 mb-4">
            <div className="space-y-1.5">
              <label className="text-slate-400 text-xs font-mono uppercase">Enter OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 bg-cyber-dark/80 border border-white/5 focus:border-neon-purple/50 focus:outline-none rounded text-white text-sm font-mono tracking-widest text-center"
                placeholder="000000"
              />
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={!otp || isVerifying}
              className={`w-full py-3 rounded-lg font-space text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border
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
                  <Download className="w-4 h-4" />
                  Verify & Download
                </>
              )}
            </button>
          </div>
        )}

        {/* Download Button (shown after verification) */}
        {otpVerified && (
          <a
            href="/resume/Sohail_Resume.pdf"
            download="Mohammad_Sohail_Shaikh_Resume.pdf"
            onClick={() => setTimeout(handleClose, 500)}
            className="w-full py-3 rounded-lg font-space text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50 mb-4"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        )}

        {/* Status Message */}
        {statusMessage && (
          <div className={`text-xs font-mono p-2 rounded border-l-2 flex items-center gap-2
            ${statusMessage.includes("✓") || statusMessage.includes("sent")
              ? "bg-green-500/10 border-green-500 text-green-400"
              : "bg-amber-500/10 border-amber-500 text-amber-300"
            }
          `}>
            {statusMessage.includes("✓") || statusMessage.includes("sent") ? (
              <Check className="w-4 h-4 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
