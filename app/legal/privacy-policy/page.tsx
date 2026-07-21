import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us. This includes your name, email address, phone number, company name, and any messages you send.

We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This information is collected through cookies and similar tracking technologies.`
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:
• Respond to your inquiries and fulfill your requests
• Communicate with you about our services, projects, and events
• Send you marketing communications (with your consent)
• Improve and personalize your experience on our website
• Analyze usage trends and preferences
• Comply with legal obligations`
  },
  {
    title: "Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential.

We may also disclose your information where required by law, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.`
  },
  {
    title: "Data Retention",
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. When your information is no longer needed, we will securely delete or anonymize it.`
  },
  {
    title: "Cookies",
    content: `Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You may choose to disable cookies through your browser settings, though this may affect your ability to use certain features of our website. Please see our Cookie Policy for more information.`
  },
  {
    title: "Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal information:
• The right to access the personal data we hold about you
• The right to request correction of inaccurate data
• The right to request deletion of your data
• The right to restrict or object to processing
• The right to data portability

To exercise any of these rights, please contact us at privacy@omarandpartners.com.`
  },
  {
    title: "Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.`
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated effective date. We encourage you to review this policy periodically.`
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy<br />Policy
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
                Omar &amp; Partners (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or engage with our services.
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
                <Link href="/legal/terms-and-conditions" className="text-xs text-foreground hover:text-primary transition-colors uppercase tracking-wider">Terms &amp; Conditions</Link>
                <Link href="/legal/cookie-policy" className="text-xs text-foreground hover:text-primary transition-colors uppercase tracking-wider">Cookie Policy</Link>
                <Link href="/contact" className="text-xs text-foreground hover:text-primary transition-colors uppercase tracking-wider mt-2 pt-4 border-t border-border">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
