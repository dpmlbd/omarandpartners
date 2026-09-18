"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { RiArrowLeftLine, RiMailLine } from "@remixicon/react";

export default function InexComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  const letters = "INEX".split("");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0C0A09] -mt-24 pt-24">

      {/* ── Grain / noise texture overlay ────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Decorative radial glow ───────────────────────────────────── */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#059669]/5 blur-[120px] pointer-events-none z-0" />

      {/* ── Animated vertical line ───────────────────────────────────── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#059669]/50 to-transparent z-10"
      />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Company descriptor */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-8 h-[1px] bg-[#059669]/40" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium">
            Building Materials & Sourcing
          </span>
          <span className="w-8 h-[1px] bg-[#059669]/40" />
        </motion.div>

        {/* Giant staggered letter reveal */}
        <div className="flex items-baseline gap-2 md:gap-4 mb-8">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 1,
                delay: 0.8 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-heading font-bold text-white/90 tracking-tighter"
              style={{ fontSize: "clamp(5rem, 15vw, 14rem)", lineHeight: 0.85 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Horizontal line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5 }}
          className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#059669]/50 to-transparent mb-10"
        />

        {/* "Coming Soon" with pulsing dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-[#059669]"
          />
          <span className="text-sm uppercase tracking-[0.35em] text-white/60 font-medium">
            Coming Soon
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-white/30 text-sm font-light leading-relaxed max-w-md mb-14"
        >
          We&apos;re crafting something exceptional. INEX will redefine how premium
          materials are sourced, curated, and delivered across the globe.
        </motion.p>

        {/* Notify Me form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="w-full max-w-sm"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-0">
              <div className="relative flex-1">
                <RiMailLine
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white text-sm pl-10 pr-4 py-3.5 placeholder:text-white/20 focus:outline-none focus:border-[#059669]/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-[#059669] text-white px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#059669]/80 transition-colors shrink-0"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#059669]/30 bg-[#059669]/5 py-4 px-6 text-sm text-[#059669] tracking-wide"
            >
              We&apos;ll keep you updated.
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-between px-8 md:px-14"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors text-[11px] uppercase tracking-widest"
        >
          <RiArrowLeftLine size={13} />
          Back to Home
        </Link>
        <span className="text-white/15 text-[10px] uppercase tracking-[0.3em] font-mono">
          Part of Omar & Partners
        </span>
      </motion.div>
    </div>
  );
}
