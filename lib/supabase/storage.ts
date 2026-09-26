export const STORAGE_BUCKET = "onp-media";

export function getPublicStorageUrl(path: string | null | undefined): string {
  if (!path) return "/images/architecture.png";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return `/${path}`;

  const cleanPath = path.startsWith(`${STORAGE_BUCKET}/`)
    ? path.slice(STORAGE_BUCKET.length + 1)
    : path;

  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanPath}`;
}
