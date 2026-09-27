"use server";

import { fetchLeadership } from "@/lib/public/leadership";
import type { Leader } from "@/lib/public/leadership";

export async function getLeadershipAction(): Promise<Leader[]> {
  return await fetchLeadership();
}
