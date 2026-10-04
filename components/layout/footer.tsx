import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CopyPhone } from "@/components/ui/copy-phone";

export function Footer() {
  const comp0 = siteConfig.companies[0];
  const comp1 = siteConfig.companies[1];
  const comp2 = siteConfig.companies[2];
  const comp3 = siteConfig.companies[3];

  const companiesList = [
    {
      name: comp0?.name || "Omar & Partners",
      description: comp0?.description || "Holding Company",
      email: "info@onp-bd.com",
    },
    {
      name: comp1?.name || "Kolpoporishor",
      description: comp1?.description || "Consultancy",
      email: "kolpoporishor@gmail.com",
    },
    {
      name: comp2?.name || "Kolpokowsol",
      description: comp2?.description || "Consultancy & Construction",
      email: "kolpokowsol@gmail.com",
    },
    {
      name: comp3?.name || "INEX",
      description: comp3?.description || "Building Materials — Coming Soon",
      email: "inexmgt.bd@gmail.com",
    },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">

      <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none select-none overflow-hidden">
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

          {/* Column 1: Brand */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <Link href="/" className="flex flex-col gap-5 items-start group">
              <Image
                src="/onp.svg"
                alt="ONP"
                width={80}
                height={80}
                className="w-20 h-20 object-contain shrink-0"
              />
              <span className="font-heading text-2xl font-bold tracking-tighter uppercase text-background">
                Omar &amp; Partners
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs font-normal">
              {siteConfig.description}
            </p>
          </div>

          {/* Column 2: Navigate */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-background/40">Navigate</h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Teams", href: "/teams" },
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

          {/* Column 3: Companies (Single Column) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-background/40">Companies</h4>
            <div className="flex flex-col gap-4 text-sm font-normal leading-relaxed">
              {companiesList.map((company, idx) => (
                <div key={company.email} className={idx > 0 ? "pt-3" : ""}>
                  <p className="font-medium text-background/80 uppercase tracking-widest text-xs mb-1">
                    {company.name} {company.description ? `(${company.description})` : ""}
                  </p>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(company.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-mono text-background/60 hover:text-background transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Address & Phone Number */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-background/40">Office</h4>
            <div className="flex flex-col gap-5 text-sm font-normal leading-relaxed">
              <div>
                <p className="font-medium text-background/80 uppercase tracking-widest text-[10px] mb-1.5">Office Address</p>
                <p className="text-xs font-light text-background/65 leading-relaxed">
                  13/A SS Khaled Road (L-4, B-1),<br />
                  Kazir Dewri, Chattogram- 4000, Bangladesh
                </p>
              </div>

              <CopyPhone phone="+8801711828646" />
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <p className="text-xs text-background/40 uppercase tracking-widest font-medium">
            &copy; {new Date().getFullYear()} {" "} | Omar &amp; Partners | All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-background/40 uppercase tracking-widest font-medium">
            <Link href="/legal/privacy-policy" className="hover:text-background transition-colors">Privacy</Link>
            <Link href="/legal/terms-and-conditions" className="hover:text-background transition-colors">Terms</Link>
            <Link href="/legal/cookie-policy" className="hover:text-background transition-colors">Cookies</Link>
            <Link href="/admin/login" className="hover:text-background transition-colors opacity-60 hover:opacity-100">Admin</Link>
          </div>
          <p className="text-xs text-background/40 uppercase tracking-widest font-medium">
            Made by <span className="text-primary font-semibold">MOHAMMED IFTEKHAR</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
