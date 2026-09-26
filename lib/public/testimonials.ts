import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { Testimonial } from "@/types/database";

export interface PublicTestimonialView {
  name: string;
  role: string;
  image: string;
  quote: string;
  location: string;
}

export async function fetchPublicTestimonials(
  fallbackList: PublicTestimonialView[]
): Promise<PublicTestimonialView[]> {
  try {
    const supabase = await createClient();
    const { data: dbTestimonials } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (dbTestimonials && dbTestimonials.length > 0) {
      return (dbTestimonials as Testimonial[]).map((t) => ({
        name: t.name,
        role: t.work,
        image: getPublicStorageUrl(t.image),
        quote: t.description,
        location: t.location,
      }));
    }
  } catch (err) {
    console.warn("Database testimonials query skipped/errored, using fallback:", err);
  }

  return fallbackList;
}
