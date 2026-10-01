"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { RiShieldCheckLine, RiCloseLine } from "@remixicon/react";

const COOKIE_CONSENT_KEY = "onp_cookie_notice_acknowledged";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const acknowledged = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!acknowledged) {
        // Smooth entrance delay after initial page paint
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In restricted private mode or environments without localStorage
    }
  }, []);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Cookie & Privacy Notice"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 sm:max-w-md w-auto"
        >
          <div className="relative bg-background/95 dark:bg-card/95 backdrop-blur-md border border-border p-5 sm:p-6 shadow-2xl overflow-hidden">
            {/* Corner accent border */}
            <div className="absolute top-0 left-0 w-12 h-[2px] bg-primary" />

            {/* Quick close button */}
            <button
              onClick={handleAcknowledge}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground p-1 transition-colors"
              aria-label="Dismiss cookie notice"
            >
              <RiCloseLine size={16} />
            </button>

            <div className="flex flex-col gap-3">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <RiShieldCheckLine size={15} className="text-primary" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-medium">
                  Privacy &amp; Cookie Transparency
                </span>
              </div>

              {/* Content text */}
              <p className="text-xs text-muted-foreground leading-relaxed pr-4">
                We believe in zero-tracking simplicity. Omar &amp; Partners does not use advertising, marketing, or behavioral tracking cookies. We only store essential local preferences (such as your visual theme) to deliver a seamless experience.
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-border/60 mt-1">
                <Link
                  href="/legal/cookie-policy"
                  className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Cookie Policy
                </Link>

                <button
                  onClick={handleAcknowledge}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 font-mono text-[10px] uppercase tracking-widest font-medium transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
