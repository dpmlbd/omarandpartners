import { createClient } from "@/lib/supabase/server";

export interface Leader {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  tag: string;
}

const DEFAULT_LEADERS: Leader[] = [
  {
    name: "Ar. Abdullah Al Omar",
    role: "Principal Architect & CEO",
    bio: "Principal Architect & CEO with specialized credentials: B.Arch (SUST), PM (EDCP)-Japan, MSGED (UIU).",
    image: "/images/leadership/ceo.jpeg",
    tag: "01",
  },
  {
    name: "Engr. Md. Mohiuddin Ovi",
    role: "COO",
    bio: "COO with specialized credentials: B.Sc-Civil (CUET), PGD-PM (Edu Pro, UK).",
    image: "/images/leadership/coo.jpeg",
    tag: "02",
  },
];

/**
 * Fetches leadership personnel dynamically from the Supabase backend.
 * Exclusively returns CEO and COO with official portraits from the leadership directory.
 */
export async function fetchLeadership(): Promise<Leader[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("team")
      .select("*")
      .or("designation.ilike.%CEO%,designation.ilike.%COO%,name.ilike.%Omar%,name.ilike.%Mohiuddin%")
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) {
        console.error("Error fetching leadership members from Supabase:", error);
      }
      return DEFAULT_LEADERS;
    }

    const ceoMember = data.find((m) =>
      (m.designation || "").toLowerCase().includes("ceo") ||
      (m.name || "").toLowerCase().includes("omar")
    );

    const cooMember = data.find((m) =>
      (m.designation || "").toLowerCase().includes("coo") ||
      (m.name || "").toLowerCase().includes("ovi") ||
      (m.name || "").toLowerCase().includes("mohiuddin")
    );

    const leaders: Leader[] = [];

    // CEO entry
    if (ceoMember) {
      leaders.push({
        id: ceoMember.id,
        name: ceoMember.name || "Ar. Abdullah Al Omar",
        role: ceoMember.designation || "Principal Architect & CEO",
        bio:
          ceoMember.bio ||
          (ceoMember.study
            ? `${ceoMember.designation} with specialized credentials: ${ceoMember.study}.`
            : "Principal Architect & CEO at Omar & Partners."),
        image: "/images/leadership/ceo.jpeg",
        tag: "01",
      });
    } else {
      leaders.push(DEFAULT_LEADERS[0]);
    }

    // COO entry
    if (cooMember) {
      leaders.push({
        id: cooMember.id,
        name: cooMember.name || "Engr. Md. Mohiuddin Ovi",
        role: cooMember.designation || "COO",
        bio:
          cooMember.bio ||
          (cooMember.study
            ? `${cooMember.designation} with specialized credentials: ${cooMember.study}.`
            : "COO at Omar & Partners."),
        image: "/images/leadership/coo.jpeg",
        tag: "02",
      });
    } else {
      leaders.push(DEFAULT_LEADERS[1]);
    }

    return leaders;
  } catch (err) {
    console.error("Database query failed in fetchLeadership:", err);
    return DEFAULT_LEADERS;
  }
}
