import Link from "next/link";
import { cookiePolicySections as sections } from "@/static-data/legal";

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-foreground text-background px-8 md:px-14 pt-32 pb-16 border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Legal</span>
          </div>
          <h1 className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Cookie<br />Policy
          </h1>
          <p className="mt-6 text-background/50 text-sm font-light max-w-md">Effective Date: 1 January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Index col */}
            <div className="hidden md:block md:col-span-2">
              <div className="sticky top-28 flex flex-col gap-3">
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest">Legal</span>
                <span className="w-[1px] h-12 bg-border" />
                <nav className="flex flex-col gap-3 mt-2">
                  {sections.map((s, i) => (
                    <a key={i} href={`#section-${i}`} className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content col */}
            <div className="md:col-span-8 flex flex-col divide-y divide-border">
              <p className="pb-12 text-muted-foreground text-sm leading-relaxed font-light">
                This Cookie Policy explains how Omar &amp; Partners uses cookies and similar technologies on our website. By using our website, you consent to our use of cookies in accordance with this policy.
              </p>
              {sections.map((section, i) => (
                <div key={i} id={`section-${i}`} className="py-10 scroll-mt-28">
                  <h2 className="font-heading text-lg font-medium uppercase tracking-tight mb-4">{section.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="hidden md:block md:col-span-2">
              <div className="sticky top-28 flex flex-col gap-4 border border-border p-5">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Related</span>
                <Link href="/legal/privacy-policy" className="text-xs text-foreground hover:text-primary transition-colors uppercase tracking-wider">Privacy Policy</Link>
                <Link href="/legal/terms-and-conditions" className="text-xs text-foreground hover:text-primary transition-colors uppercase tracking-wider">Terms &amp; Conditions</Link>
                <Link href="/contact" className="text-xs text-foreground hover:text-primary transition-colors uppercase tracking-wider mt-2 pt-4 border-t border-border">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
