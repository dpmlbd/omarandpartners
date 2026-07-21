"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { CTASection } from "@/components/ui/cta-section";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "general",
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
      setFormData({ name: "", email: "", company: "general", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const locations = [
    { city: "New York", country: "United States", addr: "123 Architecture Ave.", tel: "+1 (555) 123-4567" },
    { city: "London", country: "United Kingdom", addr: "14 Belgrave Square", tel: "+44 20 7123 4567" },
    { city: "Dhaka", country: "Bangladesh", addr: "House 12, Road 5, Banani", tel: "+880 2 9876543" },
    { city: "Dubai", country: "United Arab Emirates", addr: "Marina Plaza, Level 28", tel: "+971 4 123 4567" }
  ];

  const divisions = [
    {
      tag: "Architecture",
      title: "Kolpoporisor",
      addr: "88 Skyline Boulevard, New York, NY 10002",
      email: "arch@kolpoporisor.com",
      tel: "+1 (555) 123-4568",
      footer: "01_ARCH",
    },
    {
      tag: "Interior Design",
      title: "Kolpokowsol",
      addr: "45 Studio Way, Suite B, Brooklyn, NY 11201",
      email: "studio@kolpokowsol.com",
      tel: "+1 (555) 123-4569",
      footer: "02_INT",
    },
    {
      tag: "Building Materials",
      title: "INEX",
      addr: "12 Warehouse District, Logistics City, NJ 07001",
      email: "supply@inexmaterials.com",
      tel: "+1 (555) 123-4570",
      footer: "03_MAT",
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* Hero */}
      <section className="bg-foreground text-background px-8 md:px-14 pt-32 pb-16 border-b border-border">
        <div className="container mx-auto">
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
                      <option value="general">Omar & Partners (Holding Group)</option>
                      <option value="kolpoporisor">Kolpoporisor (Architecture)</option>
                      <option value="kolpokowsol">Kolpokowsol (Interior Design)</option>
                      <option value="inex">INEX (Building Materials)</option>
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
                    <p>123 Architecture Ave.<br />Suite 500<br />New York, NY 10001</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <RiMailLine size={18} className="text-foreground shrink-0" />
                    <a href="mailto:info@omarandpartners.com" className="hover:text-primary transition-colors">info@omarandpartners.com</a>
                  </div>
                  <div className="flex items-center gap-4">
                     <RiPhoneLine size={18} className="text-foreground shrink-0" />
                    <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
                  </div>
                  <div className="flex items-start gap-4">
                     <RiTimeLine size={18} className="text-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground uppercase tracking-widest text-[10px] mb-1">Business Hours</p>
                      <p>Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                      <p>Saturday – Sunday: Closed</p>
                    </div>
                  </div>
                  <div className="mt-8 relative w-full h-[220px] border border-border overflow-hidden grayscale contrast-[1.1] opacity-85">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4284897092305!2d-73.98762742341774!3d40.75122177138767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Empire State Building" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section id="division-contacts" className="py-24 md:py-36 border-b border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="04" title="Division Contacts" subtitle="Direct channels for our architecture, interior design, and materials supply companies." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {divisions.map((div, i) => (
              <FeatureCard
                key={i}
                icon={<RiBuilding4Line size={16} />}
                title={div.title}
                className="border border-border"
                footer={
                  <div className="flex flex-col gap-4 text-sm font-light text-muted-foreground mt-4">
                    <div className="flex items-start gap-3">
                       <RiMapPinLine size={16} className="text-foreground shrink-0 mt-0.5" />
                      <p>{div.addr}</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <RiMailLine size={16} className="text-foreground shrink-0" />
                      <a href={`mailto:${div.email}`} className="hover:text-primary transition-colors">{div.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                       <RiPhoneLine size={16} className="text-foreground shrink-0" />
                      <a href={`tel:${div.tel.replace(/[^0-9+]/g, '')}`} className="hover:text-primary transition-colors">{div.tel}</a>
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

      <section className="py-24 md:py-36 border-b border-border bg-secondary/10">
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

      <section id="locations" className="py-24 md:py-36 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Office Locations" subtitle="Our global operations hubs across strategic business centers." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-border">
            {locations.map((loc, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group flex flex-col p-8 bg-background border-r border-border last:border-r-0 hover:bg-secondary/30 transition-colors duration-300 min-h-[160px]">
                   <span className="text-[10px] uppercase tracking-widest text-foreground font-semibold mb-1">{loc.country}</span>
                  <h4 className="font-heading text-lg font-medium uppercase tracking-tight mb-3">{loc.city}</h4>
                  <p className="text-xs text-muted-foreground font-light mb-2">{loc.addr}</p>
                  <a href={`tel:${loc.tel.replace(/[^0-9+]/g, '')}`} className="text-xs text-muted-foreground hover:text-primary transition-colors font-light mt-auto pt-4">{loc.tel}</a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
