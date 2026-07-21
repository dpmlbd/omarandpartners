import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center bg-background text-foreground px-6 md:px-14 py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Label index */}
          <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3 pt-1">
            <span className="font-mono text-[10px] text-primary tracking-widest font-semibold">[ERROR_404]</span>
            <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
          </div>

          {/* Heading */}
          <div className="md:col-span-6">
            <h1 className="font-heading text-6xl md:text-8xl font-semibold tracking-tighter uppercase leading-[0.9]">
              Page Not<br />Found
            </h1>
            <p className="mt-6 text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-sm">
              The page you are looking for does not exist, has been removed, or has had its name changed.
            </p>
          </div>

          {/* CTA Link */}
          <div className="md:col-span-4 border-l border-border pl-8 md:pl-12 flex flex-col justify-between h-full pt-4 md:pt-0">
            <div>
              <h3 className="font-heading text-lg font-medium uppercase tracking-tight mb-2">Looking for something else?</h3>
              <p className="text-muted-foreground text-xs font-light mb-6">Return to our homepage to explore our ecosystem, core divisions, and latest spatial designs.</p>
            </div>
            
            <Link 
              href="/"
              className="inline-flex items-center justify-between w-full border border-foreground text-foreground px-6 py-4 text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 group"
            >
              Back to Home
              <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
