"use client";

import { useState } from "react";
import { RiCheckLine } from "@remixicon/react";

interface CopyPhoneProps {
  phone?: string;
  className?: string;
}

export function CopyPhone({ phone = "+8801711828646", className = "" }: CopyPhoneProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(phone);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = phone;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className={className}>
      <p className="font-medium text-background/80 uppercase tracking-widest text-[10px] mb-1.5">Phone</p>
      <button
        type="button"
        onClick={handleCopy}
        className="group inline-flex items-center gap-1.5 font-mono text-xs text-background/70 hover:text-background transition-colors cursor-pointer text-left p-0 border-0 bg-transparent"
        title={copied ? "Copied!" : "Click to copy"}
        aria-label="Click to copy phone number"
      >
        <span className="tracking-wider group-hover:underline underline-offset-4">
          {copied ? "Copied to clipboard" : phone}
        </span>
        {copied && <RiCheckLine size={13} className="text-emerald-400 shrink-0" />}
      </button>
    </div>
  );
}
