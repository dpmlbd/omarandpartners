"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiTimeLine,
  RiArrowRightLine,
  RiArrowDownSLine,
  RiBuilding4Line,
} from "@remixicon/react";
import { faqs } from "./faqs";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: siteConfig.companies[0]?.name || "Omar & Partners",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: siteConfig.companies[0]?.name || "Omar & Partners",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const DIVISION_EMAILS: Record<string, string> = {
    "Kolpoporisor": "kolpoporishor@gmail.com",
    "Kolpokowsol": "kolpokowsol@gmail.com",
    "INEX": "inexmgt.bd@gmail.com",
    "Omar & Partners": "info@onp-bd.com",
  };

  const divisions = siteConfig.companies
    .filter((c) => c.href !== "/")
    .map((c, i) => ({
      tag: c.description,
      title: c.name,
      email: DIVISION_EMAILS[c.name] || "info@onp-bd.com",
      footer: `0${i + 1}_${c.name.slice(0, 2).toUpperCase()}`,
    }));

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* Hero */}
      <section className="bg-foreground text-background px-8 md:px-14 pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Connect With Us</span>
          </div>
          <h1 className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Get In<br />Touch
          </h1>
          <p className="mt-6 text-background/50 text-sm font-light max-w-md">Have a project in mind or want to collaborate? Select the appropriate division or contact our holding office directly.</p>
        </div>
      </section>

      <section id="contact-form" className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">Inquiry</span>
            </div>

            <div className="md:col-span-6 pr-0 md:pr-8">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="bg-secondary/20 border border-border p-3 rounded-none focus:outline-none focus:border-primary text-sm transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="bg-secondary/20 border border-border p-3 rounded-none focus:outline-none focus:border-primary text-sm transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-xs uppercase tracking-widest text-muted-foreground">Inquiry Destination</label>
                    <select id="company" name="company" value={formData.company} onChange={handleChange} className="bg-secondary/20 border border-border p-3 rounded-none focus:outline-none focus:border-primary text-sm transition-colors">
                      {siteConfig.companies.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.description})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">Subject</label>
                    <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="bg-secondary/20 border border-border p-3 rounded-none focus:outline-none focus:border-primary text-sm transition-colors" placeholder="Project Discussion" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea id="message" name="message" rows={6} required value={formData.message} onChange={handleChange} className="bg-secondary/20 border border-border p-3 rounded-none focus:outline-none focus:border-primary text-sm resize-none transition-colors" placeholder="Tell us about your project or inquiry..." />
                  </div>

                  <button type="submit" className="bg-foreground text-background uppercase tracking-widest text-xs font-semibold p-4 rounded-none hover:bg-primary transition-colors flex items-center justify-center gap-2">
                    {submitted ? "Inquiry Sent" : "Send Inquiry"}
                    {!submitted && <RiArrowRightLine size={14} />}
                  </button>
                </form>
              </ScrollReveal>
            </div>

            <div className="md:col-span-4 border-l border-border pl-8 md:pl-12 flex flex-col gap-8">
              <ScrollReveal delay={0.2}>
                <h3 className="font-heading text-xl font-medium uppercase tracking-tight mb-4">ONP Holding Head Office</h3>
                <div className="flex flex-col gap-6 text-sm font-light text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <RiMapPinLine size={18} className="text-foreground shrink-0 mt-0.5" />
                    <p>13/A SS Khaled Road (1--4, B-1),<br />Kazir Dewri, Chattogram- 4000, Bangladesh</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <RiMailLine size={18} className="text-foreground shrink-0" />
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=info@onp-bd.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      info@onp-bd.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <RiPhoneLine size={18} className="text-foreground shrink-0" />
                    <a href="tel:+8801711828646" className="hover:text-primary transition-colors">+8801711828646</a>
                  </div>
                  <div className="flex items-start gap-4">
                    <RiTimeLine size={18} className="text-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground uppercase tracking-widest text-[10px] mb-1">Business Hours</p>
                      <p>Saturday – Thursday: 9:00 AM – 6:00 PM (BST)</p>
                      <p>Friday: Closed</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-2">
                    <div className="relative w-full h-[220px] border border-border overflow-hidden grayscale contrast-[1.1] opacity-90">
                      <iframe
                        src="https://maps.google.com/maps?q=22.3482466,91.8278386&hl=en&z=17&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="13/A SS Khaled Road, Kazir Dewri, Chattogram"
                      />
                    </div>
                    <a
                      href="https://maps.google.com/?q=22.3482466,91.8278386"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 uppercase tracking-wider font-medium"
                    >
                      View Location in Google Maps &rarr;
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section id="division-contacts" className="py-24 md:py-36 border-b border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Division Contacts" subtitle={`Direct channels for ${siteConfig.companies.slice(1).map((c) => `${c.name} (${c.description})`).join(", ")}.`} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {divisions.map((div, i) => (
              <FeatureCard
                key={i}
                icon={<RiBuilding4Line size={16} />}
                title={div.title}
                className="border border-border"
                footer={
                  <div className="flex flex-col gap-3 text-sm font-light text-muted-foreground mt-4">
                    <div className="flex items-center gap-3">
                      <RiMailLine size={16} className="text-foreground shrink-0" />
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(div.email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {div.email}
                      </a>
                    </div>
                  </div>
                }
              >
                <span className="text-[10px] uppercase tracking-widest text-foreground font-medium block mb-1">{div.tag}</span>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Frequently Asked Questions" subtitle="Quick answers to common questions about working with us." />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-2 hidden md:block" />
            <div className="md:col-span-8 flex flex-col gap-px border border-border">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-background">
                  <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-secondary/20 transition-colors duration-300">
                    <span className="font-heading text-base md:text-lg font-medium tracking-tight pr-4">{faq.question}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-muted-foreground">
                      <RiArrowDownSLine size={20} />
                    </motion.div>
                  </button>
                  <motion.div initial={false} animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
