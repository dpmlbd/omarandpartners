import type { Metadata } from "next";
import { AboutView } from "./about-view";

export const metadata: Metadata = {
  title: "ONP | About",
  description: "Learn about Omar & Partners, our mission, vision, and leadership.",
};

export default function AboutPage() {
  return <AboutView />;
}
