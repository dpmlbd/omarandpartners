import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-heading font-bold uppercase tracking-tighter text-background/[0.02] whitespace-nowrap"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 1 }}
          aria-hidden="true"
        >
          Omar&amp;Partners
        </span>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="relative z-10 container mx-auto px-6 md:px-14 pt-32 pb-16">

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 md:gap-10 pb-24 border-b border-background/10">

          {/* Brand column */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <Link href="/" className="flex flex-col gap-5 items-start group">
              <Image src="/onp.svg" alt="ONP" width={80} height={80} className="shrink-0" />
              <span className="font-heading text-2xl font-bold tracking-tighter uppercase text-background">
                Omar &amp; Partners
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs font-normal">
              Defining the future of living spaces through architecture, design, and premium materials.
            </p>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-background/40">Navigate</h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
                { label: "Brand Assets", href: "/brands" },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="text-sm text-background/70 hover:text-background transition-colors uppercase tracking-wide font-medium">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Holding & Architecture Address */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-background/40">Holding &amp; Architecture</h4>
            <div className="flex flex-col gap-4 text-sm text-background/70 font-normal leading-relaxed">
              <div>
                <p className="font-medium text-background/80 uppercase tracking-widest text-xs mb-1">ONP Holding Group</p>
                <p>123 Architecture Ave, New York, NY 10001</p>
                <a href="mailto:info@omarandpartners.com" className="text-background/70 hover:text-background transition-colors">info@omarandpartners.com</a>
              </div>
              <div className="border-t border-background/10 pt-4">
                <p className="font-medium text-background/80 uppercase tracking-widest text-xs mb-1">Kolpoporisor (Architecture)</p>
                <p>88 Skyline Boulevard, New York, NY 10002</p>
                <a href="mailto:arch@kolpoporisor.com" className="text-background/70 hover:text-background transition-colors">arch@kolpoporisor.com</a>
              </div>
            </div>
          </div>

          {/* Interiors & Materials Address */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-background/40">Interiors &amp; Materials</h4>
            <div className="flex flex-col gap-4 text-sm text-background/70 font-normal leading-relaxed">
              <div>
                <p className="font-medium text-background/80 uppercase tracking-widest text-xs mb-1">Kolpokowsol (Interior Design)</p>
                <p>45 Studio Way, Suite B, Brooklyn, NY 11201</p>
                <a href="mailto:studio@kolpokowsol.com" className="text-background/70 hover:text-background transition-colors">studio@kolpokowsol.com</a>
              </div>
              <div className="border-t border-background/10 pt-4">
                <p className="font-medium text-background/80 uppercase tracking-widest text-xs mb-1">INEX (Building Materials)</p>
                <p>12 Warehouse District, NJ 07001</p>
                <a href="mailto:supply@inexmaterials.com" className="text-background/70 hover:text-background transition-colors">supply@inexmaterials.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <p className="text-xs text-background/40 uppercase tracking-widest font-medium">
            &copy; {new Date().getFullYear()} Omar &amp; Partners. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-background/40 uppercase tracking-widest font-medium">
            <Link href="/legal/privacy-policy" className="hover:text-background transition-colors">Privacy</Link>
            <Link href="/legal/terms-and-conditions" className="hover:text-background transition-colors">Terms</Link>
            <Link href="/legal/cookie-policy" className="hover:text-background transition-colors">Cookies</Link>
          </div>
          <p className="text-xs text-background/40 uppercase tracking-widest font-medium">
            Made by <span className="text-primary font-semibold">X</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
