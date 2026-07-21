const fs = require('fs');

let pageContent = fs.readFileSync('c:/Programming/New folder (2)/omarandpartners/app/page.tsx', 'utf-8');

// The new Hero Section to replace the old one
const newHero = `{/* 1. Hero Section (Editorial Drafting Style) */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Architectural Render */}
        <div className="absolute inset-0 z-0 border-b border-border">
          <Image src="/images/hero_architecture.png" alt="Monumental Architecture" fill className="object-cover opacity-90 md:opacity-70 grayscale" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col w-full h-full pt-32 pb-12">
          
          {/* Top Registration Mark */}
          <div className="w-full flex justify-between text-muted-foreground text-[10px] uppercase tracking-widest mb-16">
            <span>omarandpartners.com</span>
            <span>Est. 2026</span>
          </div>

          {/* Drafting Grid Area */}
          <div className="relative border-y border-border/70 py-16 md:py-24 my-auto w-full backdrop-blur-[2px]">
            {/* Crosshairs */}
            <div className="absolute -top-[9px] -left-2 text-foreground font-light text-sm">+</div>
            <div className="absolute -top-[9px] -right-2 text-foreground font-light text-sm">+</div>
            <div className="absolute -bottom-[9px] -left-2 text-foreground font-light text-sm">+</div>
            <div className="absolute -bottom-[9px] -right-2 text-foreground font-light text-sm">+</div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 relative w-full">
              
              <ScrollReveal delay={0.2} className="w-full">
                <h1 className="font-heading text-6xl md:text-[8rem] lg:text-[10rem] font-normal tracking-tighter uppercase leading-[0.85] text-foreground text-center md:text-left">
                  OMAR &<br />PARTNERS
                </h1>
              </ScrollReveal>

              {/* Top Right Thumbnails (Floating) */}
              <ScrollReveal delay={0.4} className="flex gap-2 shrink-0 relative mt-8 md:mt-0 opacity-90 hover:opacity-100 transition-opacity">
                <div className="w-20 md:w-28 aspect-[3/4] relative border border-border bg-background p-1 shadow-lg transform -rotate-2">
                  <Image src="/images/architecture.png" fill className="object-cover p-1 grayscale hover:grayscale-0 transition-all duration-700" alt="Architecture" />
                </div>
                <div className="w-20 md:w-28 aspect-[3/4] relative border border-border bg-background p-1 shadow-lg transform translate-y-8 rotate-1">
                  <Image src="/images/interior.png" fill className="object-cover p-1 grayscale hover:grayscale-0 transition-all duration-700" alt="Interior" />
                </div>
                <div className="w-20 md:w-28 aspect-[3/4] relative border border-border bg-background p-1 shadow-lg transform translate-y-4 rotate-3">
                  <Image src="/images/materials.png" fill className="object-cover p-1 grayscale hover:grayscale-0 transition-all duration-700" alt="Materials" />
                </div>
              </ScrollReveal>

            </div>
          </div>

          {/* Subheadline Registration */}
          <div className="mt-16 flex justify-center md:justify-end">
            <ScrollReveal delay={0.6}>
              <p className="text-center md:text-right text-lg md:text-2xl font-light tracking-widest uppercase text-foreground max-w-2xl leading-relaxed bg-background/50 backdrop-blur-md p-4 rounded-md">
                A synergy of visionary architecture, <br className="hidden md:block"/> refined interiors, & premium materials.
              </p>
            </ScrollReveal>
          </div>
          
        </div>
      </section>`;

// Replace the old hero section
const regex = /{\/\* 1\. Hero Section.*?<\/section>/s;
pageContent = pageContent.replace(regex, newHero);

fs.writeFileSync('c:/Programming/New folder (2)/omarandpartners/app/page.tsx', pageContent);

console.log('Hero section replaced successfully.');
