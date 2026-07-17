"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, MonitorSmartphone } from "lucide-react";

interface VisitCounterProps {
  currentTheme: "cyberpunk" | "matrix";
}

export default function VisitCounter({ currentTheme }: VisitCounterProps) {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const [uniqueDevices, setUniqueDevices] = useState<number | null>(null);
  // Guard against React Strict Mode's double effect invocation, which would
  // otherwise fire two POSTs before sessionStorage is set and double-count.
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const recordVisit = async () => {
      try {
        // Stable per-device id stored in localStorage
        let deviceId = localStorage.getItem("sohail_dev_device_id");
        if (!deviceId) {
          deviceId = crypto.randomUUID();
          localStorage.setItem("sohail_dev_device_id", deviceId);
        }

        // Count a "visit" once per browser session (not on every reload)
        const alreadyCounted = sessionStorage.getItem("sohail_dev_visit_counted");

        const res = await fetch("/api/visits", {
          method: alreadyCounted ? "GET" : "POST",
          ...(alreadyCounted
            ? {}
            : {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deviceId }),
              }),
        });

        if (!res.ok) return;
        const data = await res.json();

        if (!alreadyCounted) {
          sessionStorage.setItem("sohail_dev_visit_counted", "1");
        }

        setTotalVisits(data.totalVisits);
        setUniqueDevices(data.uniqueDevices);
      } catch {
        // Silently ignore — counter is non-critical
      }
    };

    recordVisit();
  }, []);

  const accent = currentTheme === "cyberpunk" ? "text-neon-cyan" : "text-green-400";
  const border =
    currentTheme === "cyberpunk"
      ? "border-neon-purple/30 bg-neon-purple/5"
      : "border-green-500/30 bg-green-500/5";

  return (
    <div
      className={`flex items-center space-x-3 px-2.5 py-1 rounded-lg border text-[11px] font-space tracking-wide ${border}`}
      title="Live visits / unique devices"
    >
      <span className="flex items-center space-x-1 text-slate-400">
        <Eye className={`w-3.5 h-3.5 ${accent}`} />
        <span className={accent}>{(totalVisits ?? 0).toLocaleString()}</span>
      </span>
      <span className="flex items-center space-x-1 text-slate-400">
        <MonitorSmartphone className={`w-3.5 h-3.5 ${accent}`} />
        <span className={accent}>{(uniqueDevices ?? 0).toLocaleString()}</span>
      </span>
    </div>
  );
}
