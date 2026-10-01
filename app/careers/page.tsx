import type { Metadata } from "next";
import { CareersView } from "./careers-view";

export const metadata: Metadata = {
  title: "ONP | Careers",
  description: "Explore careers at Omar & Partners and join our team.",
};

export default function CareersPage() {
  return <CareersView />;
}
