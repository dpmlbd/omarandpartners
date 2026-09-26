import { createAdminClient } from "@/lib/supabase/admin";
import { STORAGE_BUCKET } from "@/lib/supabase/storage";
import { processImageToAvif, validateImageFile } from "@/lib/image/process";

export interface UploadOptions {
  file: File;
  folder: string; // e.g. 'projects/lumina-residences', 'team', 'testimonials', 'articles'
  fileName: string; // e.g. 'main.avif', '01.avif', 'article-slug.avif'
  oldPath?: string | null; // If replacing, old path to automatically delete
}

export async function uploadAndOptimizeImage({
  file,
  folder,
  fileName,
  oldPath,
}: UploadOptions): Promise<{ storagePath: string; error?: string }> {
  try {
    // 1. Validate raw upload
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return { storagePath: "", error: validation.error };
    }

    // 2. Read array buffer & process via Sharp to AVIF
    const arrayBuffer = await file.arrayBuffer();
    const { buffer } = await processImageToAvif(arrayBuffer);

    const admin = createAdminClient();
    const targetPath = `${folder.replace(/^\/+|\/+$/g, "")}/${fileName}`;

    // 3. Upload optimized AVIF to Supabase Storage
    const { error: uploadError } = await admin.storage
      .from(STORAGE_BUCKET)
      .upload(targetPath, buffer, {
        contentType: "image/avif",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { storagePath: "", error: uploadError.message };
    }

    // 4. If an old path was provided and differs from target, clean it up
    if (oldPath && oldPath !== targetPath && !oldPath.startsWith("http") && !oldPath.startsWith("/images/")) {
      await deleteStorageFile(oldPath);
    }

    return { storagePath: targetPath };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to process and upload image.";
    console.error("Error in uploadAndOptimizeImage:", error);
    return { storagePath: "", error: msg };
  }
}

export async function deleteStorageFile(path: string): Promise<boolean> {
  try {
    if (!path || path.startsWith("http") || path.startsWith("/images/")) {
      return true;
    }

    const admin = createAdminClient();
    const cleanPath = path.startsWith(`${STORAGE_BUCKET}/`)
      ? path.slice(STORAGE_BUCKET.length + 1)
      : path;

    const { error } = await admin.storage.from(STORAGE_BUCKET).remove([cleanPath]);
    if (error) {
      console.warn("Storage remove warning:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("deleteStorageFile error:", error);
    return false;
  }
}

export async function deleteStorageFolder(folderPrefix: string): Promise<boolean> {
  try {
    const admin = createAdminClient();
    const cleanFolder = folderPrefix.replace(/^\/+|\/+$/g, "");

    // List all files inside the folder
    const { data: files, error: listError } = await admin.storage
      .from(STORAGE_BUCKET)
      .list(cleanFolder, { limit: 100 });

    if (listError || !files || files.length === 0) {
      return true;
    }

    const filePaths = files.map((f) => `${cleanFolder}/${f.name}`);
    const { error: removeError } = await admin.storage
      .from(STORAGE_BUCKET)
      .remove(filePaths);

    if (removeError) {
      console.warn("deleteStorageFolder warning:", removeError.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("deleteStorageFolder error:", error);
    return false;
  }
}
