import { getTestimonials } from "@/lib/actions/testimonials";
import { TestimonialsClient } from "@/components/admin/testimonials-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Testimonials Management",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsClient initialTestimonials={testimonials} />;
}
