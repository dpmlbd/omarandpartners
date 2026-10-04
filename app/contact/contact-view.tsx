"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { z } from "zod";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { toast } from "@/components/ui/toast";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiTimeLine,
  RiArrowRightLine,
  RiArrowDownSLine,
  RiBuilding4Line,
  RiCheckLine,
  RiLoader4Line,
  RiErrorWarningLine,
} from "@remixicon/react";
import { faqs } from "@/static-data/faqs";
import { siteConfig } from "@/config/site";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter you name")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email address cannot exceed 255 characters"),
  company: z.string().min(1, "Please select an inquiry destination"),
  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject")
    .max(200, "Subject cannot exceed 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message can't be empty")
    .max(5000, "Message cannot exceed 5000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactView() {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    company: siteConfig.companies[0]?.name || "Omar & Partners",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<{
    company: string;
    email: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const PRIMARY_CONTACT_EMAIL = "info@onp-bd.com";

  const DIVISION_LOGOS: Record<string, string> = {
    "Kolpoporishor": "/logos/kolpoporishor-logo.svg",
    "Kolpoporisor": "/logos/kolpoporishor-logo.svg",
    "Kolpokowsol": "/logos/kolpokowsol-logo.svg",
    "INEX": "/logos/inex-logo.svg",
    "Omar & Partners": "/onp.svg",
  };

  const validateField = (name: keyof ContactFormValues, value: string) => {
    const singleFieldSchema = contactSchema.pick({ [name]: true } as Record<keyof ContactFormValues, true>);
    const result = singleFieldSchema.safeParse({ [name]: value });
    if (!result.success) {
      return result.error.issues[0]?.message || "Invalid input";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const err = validateField(name as keyof ContactFormValues, value);
      setErrors((prev) => ({
        ...prev,
        [name]: err,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof ContactFormValues, value);
    setErrors((prev) => ({
      ...prev,
      [name]: err,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      const newTouched: Record<string, boolean> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!newErrors[fieldName]) {
          newErrors[fieldName] = issue.message;
        }
        newTouched[fieldName] = true;
      });

      setErrors(newErrors);
      setTouched((prev) => ({ ...prev, ...newTouched }));

      toast.error("Form Validation Error", {
        description: "Please check and correct the highlighted fields before sending.",
      });
      return;
    }

    setIsSubmitting(true);
    const targetEmail = PRIMARY_CONTACT_EMAIL;
    const selectedCompany = formData.company;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to deliver inquiry.");
      }

      // Show shadcn toast notification
      toast.success("Inquiry Sent Successfully", {
        description: `Your message has been sent to ${selectedCompany} (${targetEmail}). We will get back to you shortly.`,
      });

      setSubmittedSuccess({
        company: selectedCompany,
        email: targetEmail,
      });

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        company: siteConfig.companies[0]?.name || "Omar & Partners",
        subject: "",
        message: "",
      });
      setErrors({});
      setTouched({});
    } catch (err: any) {
      console.error("[Submission Error]", err);
      toast.error("Failed to Send", {
        description:
          err.message ||
          "Could not send email through the mail service. Please verify server SMTP configuration.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const divisions = siteConfig.companies
    .filter((c) => c.href !== "/")
    .map((c, i) => ({
      tag: c.description,
      title: c.name,
      email: PRIMARY_CONTACT_EMAIL,
      logo: DIVISION_LOGOS[c.name] || "/onp.svg",
      href: c.href,
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
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                        <span>Full Name</span>
                        <span className="text-[10px] text-muted-foreground/60">*Required</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`bg-secondary/20 border p-3 rounded-none focus:outline-none text-sm transition-colors ${errors.name && touched.name
                          ? "border-destructive focus:border-destructive text-destructive"
                          : "border-border focus:border-primary text-foreground"
                          }`}
                        placeholder="John Doe"
                      />
                      {errors.name && touched.name && (
                        <p className="text-[11px] text-destructive flex items-center gap-1 mt-0.5">
                          <RiErrorWarningLine size={12} className="shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                        <span>Email Address</span>
                        <span className="text-[10px] text-muted-foreground/60">*Required</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`bg-secondary/20 border p-3 rounded-none focus:outline-none text-sm transition-colors ${errors.email && touched.email
                          ? "border-destructive focus:border-destructive text-destructive"
                          : "border-border focus:border-primary text-foreground"
                          }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && touched.email && (
                        <p className="text-[11px] text-destructive flex items-center gap-1 mt-0.5">
                          <RiErrorWarningLine size={12} className="shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                      <span>Inquiry Division</span>
                      <span className="text-[10px] text-primary font-mono">
                        {PRIMARY_CONTACT_EMAIL}
                      </span>
                    </label>
                    <select
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-secondary/20 border border-border p-3 rounded-none focus:outline-none focus:border-primary text-sm transition-colors text-foreground"
                    >
                      {siteConfig.companies.map((c) => (
                        <option key={c.name} value={c.name} className="bg-background text-foreground">
                          {c.name} — {c.description}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center justify-between px-3 py-2 bg-secondary/30 border border-border/70 text-xs">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        All inquiries routed directly to:
                      </span>
                      <span className="font-mono text-primary text-[11px] font-medium flex items-center gap-1.5">
                        <RiMailLine size={13} />
                        {PRIMARY_CONTACT_EMAIL}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                      <span>Subject</span>
                      <span className="text-[10px] text-muted-foreground/60">*Required</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`bg-secondary/20 border p-3 rounded-none focus:outline-none text-sm transition-colors ${errors.subject && touched.subject
                        ? "border-destructive focus:border-destructive text-destructive"
                        : "border-border focus:border-primary text-foreground"
                        }`}
                      placeholder="e.g. Architectural Consultancy / Residential Proposal"
                    />
                    {errors.subject && touched.subject && (
                      <p className="text-[11px] text-destructive flex items-center gap-1 mt-0.5">
                        <RiErrorWarningLine size={12} className="shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                      <span>Message</span>
                      <span className="text-[10px] text-muted-foreground/60">Min 10 characters</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`bg-secondary/20 border p-3 rounded-none focus:outline-none text-sm resize-none transition-colors ${errors.message && touched.message
                        ? "border-destructive focus:border-destructive text-destructive"
                        : "border-border focus:border-primary text-foreground"
                        }`}
                      placeholder="Tell us about your project requirements, scope, timeline, or inquiries..."
                    />
                    {errors.message && touched.message && (
                      <p className="text-[11px] text-destructive flex items-center gap-1 mt-0.5">
                        <RiErrorWarningLine size={12} className="shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {submittedSuccess && (
                    <div className="p-4 border border-primary/40 bg-primary/5 flex items-start gap-3 transition-all">
                      <RiCheckLine size={18} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                          Inquiry Successfully Sent
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Your message has been delivered directly to <strong className="text-foreground">{submittedSuccess.company}</strong> ({submittedSuccess.email}). We will review your inquiry and respond promptly.
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-foreground text-background uppercase tracking-widest text-xs font-semibold p-4 rounded-none hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RiLoader4Line size={16} className="animate-spin" />
                        Routing Inquiry...
                      </>
                    ) : (
                      <>
                        Send Inquiry to {formData.company}
                        <RiArrowRightLine size={14} />
                      </>
                    )}
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
                    <p>13/A SS Khaled Road (L-4, B-1),<br />Kazir Dewri, Chattogram- 4000, Bangladesh</p>
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
                        src="https://maps.google.com/maps?q=22.3482638,91.827792&hl=en&z=18&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Omar and Partners — Head Office"
                      />
                    </div>
                    <a
                      href="https://maps.app.goo.gl/7LMH4MJKjBVHtTQU6"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {divisions.map((div, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group flex flex-col border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 bg-background h-full">
                  {/* Divisional Logo Showcase */}
                  <div className="h-36 sm:h-40 bg-secondary/20 dark:bg-card/40 border-b border-border flex items-center justify-center p-6 overflow-hidden group-hover:bg-secondary/35 transition-colors duration-500">
                    <img
                      src={div.logo}
                      alt={`${div.title} Official Logo`}
                      className="w-full h-16 sm:h-20 max-w-[170px] object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-6 md:p-8 justify-between gap-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-primary font-medium block mb-1.5">{div.tag}</span>
                      <h4 className="font-heading text-xl font-medium uppercase tracking-tight">{div.title}</h4>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <RiMailLine size={16} className="text-foreground shrink-0" />
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(div.email)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors text-xs font-mono tracking-wide truncate"
                        >
                          {div.email}
                        </a>
                      </div>
                      <Link
                        href={div.href}
                        className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-foreground hover:text-primary transition-colors group/link mt-1"
                      >
                        Explore Division <RiArrowRightLine size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
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
