import Link from "next/link";

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing and using the Omar & Partners website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.

These terms apply to all visitors, users, and others who access or use the website operated by Omar & Partners and its subsidiary companies: Kolpoporisor, Kolpokowsol, and INEX.`
  },
  {
    title: "Intellectual Property",
    content: `All content on this website — including but not limited to text, images, graphics, project photography, architectural drawings, logos, and visual designs — is the exclusive property of Omar & Partners or its content suppliers and is protected by copyright and intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works of any content without express written permission from Omar & Partners.`
  },
  {
    title: "Use of Website",
    content: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You agree not to:

• Use the website for any fraudulent purpose
• Transmit any unsolicited commercial communications
• Attempt to gain unauthorized access to any part of the website
• Interfere with the proper working of the website
• Post or transmit any harmful, offensive, or disruptive content`
  },
  {
    title: "Project Portfolio",
    content: `All project descriptions, renderings, and photography displayed on this website represent completed and ongoing work by Omar & Partners and its subsidiaries. Client information is shared with explicit consent. Project details are provided for illustrative purposes only and may not reflect the final delivered scope.`
  },
  {
    title: "Disclaimer of Warranties",
    content: `This website is provided on an "as is" and "as available" basis. Omar & Partners makes no representations or warranties of any kind, express or implied, regarding the operation of the website or the information, content, or materials included.

We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.`
  },
  {
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by law, Omar & Partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or its content.`
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites. These links are provided for your convenience only. Omar & Partners does not endorse or take responsibility for the content or practices of any linked third-party websites.`
  },
  {
    title: "Governing Law",
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.

Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in New York County.`
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the revised terms.`
  },
];

export default function TermsAndConditionsPage() {
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
            Terms &amp;<br />Conditions
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
                Please read these Terms and Conditions carefully before using the Omar &amp; Partners website. These terms govern your use of our website and any services offered through it.
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
