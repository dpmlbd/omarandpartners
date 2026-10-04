"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAction } from "@/lib/actions/auth";
import { RiLockLine, RiMailLine, RiArrowRightLine, RiAlertLine } from "@remixicon/react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background architectural grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      {/* Top Branding */}
      <div className="relative z-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/onp.svg"
            alt="ONP"
            width={32}
            height={32}
            className="w-8 h-8 object-contain shrink-0 transition-transform duration-500 group-hover:scale-95"
          />
          <span className="font-heading text-lg font-bold tracking-tighter uppercase">
            Omar &amp; Partners
          </span>
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground border border-border px-3 py-1">
          CMS Control Panel
        </span>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto my-12">
        <div className="border border-border bg-card/60 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
              Authentication
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-2">
            Staff Portal
          </h1>
          <p className="text-muted-foreground text-xs leading-relaxed font-light mb-8">
            Access the content management system. Please authenticate with your authorized administrator or moderator credentials.
          </p>

          {state?.error && (
            <div className="mb-6 p-4 border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-3">
              <RiAlertLine size={16} className="shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">{state.error}</p>
            </div>
          )}

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium"
              >
                Email Address
              </label>
              <div className="relative">
                <RiMailLine
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="info@onp-bd.com"
                  className="w-full bg-secondary/30 border border-border pl-10 pr-4 py-3 text-sm rounded-none focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/40 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium"
              >
                Password
              </label>
              <div className="relative">
                <RiLockLine
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full bg-secondary/30 border border-border pl-10 pr-4 py-3 text-sm rounded-none focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/40 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-4 w-full bg-foreground text-background py-4 uppercase tracking-widest text-xs font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? "Authenticating..." : "Sign In to Dashboard"}
              {!isPending && <RiArrowRightLine size={14} />}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground/60 gap-4">
        <span>&copy; {new Date().getFullYear()} Omar &amp; Partners. All rights reserved.</span>
        <span className="font-mono">Security: Encrypted Session &amp; Strict RLS</span>
      </div>
    </div>
  );
}
