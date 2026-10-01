import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Insights",
  description: "Articles, news, and press releases from Omar & Partners.",
};

export default function InsightsPage() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-4xl md:text-5xl uppercase tracking-widest mb-4">
        Insights
      </h1>
      <p className="text-muted-foreground text-lg">
        This page is currently under construction.
      </p>
    </div>
  );
}
