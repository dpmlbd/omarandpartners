export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "What is the typical response time for inquiries?",
    answer: "We aim to respond to all inquiries within 24 business hours. For urgent project consultations, please call our head office directly.",
  },
  {
    question: "Can I request a consultation for multiple divisions?",
    answer: "Yes. Use the inquiry form and select the most relevant division, or mention your multi-service interest in the message body and our team will coordinate across divisions.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely. Omar & Partners operates across 18 countries. Our teams in New York, London, Dhaka, and Dubai serve clients globally with localized expertise.",
  },
  {
    question: "How do I request a quotation for materials?",
    answer: "INEX quotations are handled through the contact form by selecting INEX as your inquiry destination. Please include project specifications, quantities, and timeline for an accurate estimate.",
  },
];
