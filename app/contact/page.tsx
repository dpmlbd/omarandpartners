import type { Metadata } from "next";
import { ContactView } from "./contact-view";

export const metadata: Metadata = {
  title: "ONP | Contact",
  description: "Get in touch with Omar & Partners.",
};

export default function ContactPage() {
  return <ContactView />;
}
