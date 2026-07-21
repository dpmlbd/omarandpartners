"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine, RiArrowDownSLine } from "@remixicon/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sheet } from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathParts = pathname.split("/").filter(Boolean);
  const companySlug = pathParts[0];
  const companyName = siteConfig.companies.find(c => c.href === `/${companySlug}`)?.name;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-50">
          <Image src="/onp.svg" alt="ONP" width={32} height={32} className="shrink-0 transition-transform duration-500 group-hover:scale-95" />
          <span className="font-heading text-lg md:text-xl font-bold tracking-tighter uppercase text-foreground whitespace-nowrap">
            Omar &amp; Partners{companyName && <span className="text-muted-foreground font-normal"> | {companyName}</span>}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/" className="relative text-sm font-medium tracking-wide uppercase group">
            <span className={cn("transition-colors duration-300", pathname === "/" ? "text-primary" : "text-foreground group-hover:text-primary")}>Home</span>
          </Link>
          <Link href="/about" className="relative text-sm font-medium tracking-wide uppercase group">
            <span className={cn("transition-colors duration-300", pathname.startsWith("/about") ? "text-primary" : "text-foreground group-hover:text-primary")}>About</span>
          </Link>
          
          {/* Companies Dropdown */}
          <div className="relative group">
            <Link href="/companies" className="relative text-sm font-medium tracking-wide uppercase text-foreground group-hover:text-primary transition-colors py-6 flex items-center gap-1">
              Companies
              <RiArrowDownSLine size={16} className="text-foreground group-hover:text-primary transition-transform duration-300 group-hover:-rotate-180" />
            </Link>
            <div className="absolute top-[3.5rem] left-1/2 -translate-x-1/2 w-56 bg-background border border-border/50 rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden backdrop-blur-xl p-2 gap-1 z-50">
              {siteConfig.companies.slice(1).map((company) => (
                <Link key={company.href} href={company.href} className="px-4 py-3 rounded-md text-sm font-medium hover:bg-secondary hover:text-primary transition-colors flex flex-col gap-1">
                  <span className="uppercase tracking-wider">{company.name}</span>
                  <span className="text-[10px] text-muted-foreground normal-case tracking-normal">{company.description}</span>
                </Link>
              ))}
              <div className="border-t border-border/50 mt-1 pt-1">
                <Link href="/companies" className="px-4 py-3 rounded-md text-sm font-medium hover:bg-secondary hover:text-primary transition-colors flex flex-col gap-1">
                  <span className="uppercase tracking-wider">All Companies</span>
                  <span className="text-[10px] text-muted-foreground normal-case tracking-normal">Ecosystem Overview</span>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/careers" className="relative text-sm font-medium tracking-wide uppercase group">
            <span className={cn("transition-colors duration-300", pathname.startsWith("/careers") ? "text-primary" : "text-foreground group-hover:text-primary")}>Careers</span>
          </Link>
          <Link href="/contact" className="relative text-sm font-medium tracking-wide uppercase group">
            <span className={cn("transition-colors duration-300", pathname.startsWith("/contact") ? "text-primary" : "text-foreground group-hover:text-primary")}>Contact</span>
          </Link>

          <div className="ml-2 lg:ml-4 pl-4 lg:pl-6 border-l border-border flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden z-[60] p-2 -mr-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} side="left" topOffset="4rem">
          <nav className="flex flex-col gap-6 text-left">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn("text-2xl font-heading font-medium tracking-tight uppercase", pathname === "/" ? "text-primary" : "text-foreground")}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn("text-2xl font-heading font-medium tracking-tight uppercase", pathname.startsWith("/about") ? "text-primary" : "text-foreground")}
            >
              About
            </Link>
            
            <div className="flex flex-col gap-2 pl-4 border-l border-border/50">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Ecosystem</span>
              <Link
                href="/companies"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-heading font-medium uppercase tracking-tight text-foreground hover:text-primary transition-colors"
              >
                All Companies
              </Link>
              <Link
                href="/kolpoporisor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-heading font-medium uppercase tracking-tight text-foreground hover:text-primary transition-colors"
              >
                Kolpoporisor
              </Link>
              <Link
                href="/kolpokowsol"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-heading font-medium uppercase tracking-tight text-foreground hover:text-primary transition-colors"
              >
                Kolpokowsol
              </Link>
              <Link
                href="/inex"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-heading font-medium uppercase tracking-tight text-foreground hover:text-primary transition-colors"
              >
                INEX
              </Link>
            </div>

            <Link
              href="/careers"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn("text-2xl font-heading font-medium tracking-tight uppercase", pathname.startsWith("/careers") ? "text-primary" : "text-foreground")}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn("text-2xl font-heading font-medium tracking-tight uppercase", pathname.startsWith("/contact") ? "text-primary" : "text-foreground")}
            >
              Contact
            </Link>
          </nav>
        </Sheet>
      </div>
    </header>
  );
}
