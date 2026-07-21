import Link from "next/link";

const sections = [
  {
    title: "What Are Cookies?",
    content: `Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to the site owners.

Cookies may be "session cookies" (deleted when you close your browser) or "persistent cookies" (remaining until they expire or you delete them).`
  },
  {
    title: "How We Use Cookies",
    content: `Omar & Partners uses cookies to:

• Ensure the website functions correctly
• Remember your preferences and settings
• Understand how visitors use our website through analytics
• Improve and personalize your browsing experience
• Deliver relevant content based on your interests`
  },
  {
    title: "Types of Cookies We Use",
    content: `Strictly Necessary Cookies
These cookies are essential for the website to function and cannot be disabled. They are usually set in response to actions you take, such as filling in forms.

Performance & Analytics Cookies
We use analytics tools (such as Google Analytics) to understand how visitors interact with our website. These cookies collect aggregated, anonymous data to help us improve performance.

Functional Cookies
These cookies allow us to remember choices you make on our website to provide enhanced, more personal features.

Marketing Cookies
With your consent, we may use cookies to serve you relevant advertising and to track the effectiveness of our marketing campaigns.`
  },
  {
    title: "Third-Party Cookies",
    content: `Some cookies on our website are placed by third-party services we use, including:

• Google Analytics — for website analytics
• Google Maps — for embedded location maps
• LinkedIn, Instagram — for embedded social media content

These third parties have their own privacy policies governing their use of cookies. We encourage you to review their policies.`
  },
  {
    title: "Managing Cookies",
    content: `You can control and manage cookies through your browser settings. Most browsers allow you to:

• View which cookies are stored and delete them individually
• Block third-party cookies
• Block cookies from specific websites
• Block all cookies
• Delete all cookies when you close your browser

Please note that disabling certain cookies may affect the functionality of our website.`
  },
  {
    title: "Cookie Consent",
    content: `When you first visit our website, you will be presented with a cookie banner requesting your consent for non-essential cookies. You may withdraw or adjust your cookie preferences at any time by visiting the cookie settings link in our website footer.`
  },
  {
    title: "Updates to This Policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our use of cookies. We will notify you of any significant changes by updating the effective date below and, where appropriate, by displaying a notice on our website.`
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
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
            <div className="md:col-span-2">
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
            <div className="md:col-span-2">
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
