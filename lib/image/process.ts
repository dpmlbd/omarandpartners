import type { ResizeOptions } from "sharp";

export interface ProcessedImageResult {
  buffer: Buffer;
  width?: number;
  height?: number;
  format: "avif" | "webp";
  sizeBytes: number;
}

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/jfif",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
  "image/tiff",
  "image/bmp",
]);

const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp|avif|heic|heif|tiff?|bmp)$/i;

const MAX_LONGEST_SIDE = 2560; // 2560px max width/height for crisp high-DPI display
const AVIF_QUALITY = 80;
const WEBP_QUALITY = 82;

export async function processImageToAvif(
  fileOrBuffer: Buffer | ArrayBuffer | Uint8Array
): Promise<ProcessedImageResult> {
  const sharpModule = await import("sharp");
  const sharp = (sharpModule.default || sharpModule) as unknown as typeof import("sharp").default;

  let inputBuffer: Buffer;
  if (Buffer.isBuffer(fileOrBuffer)) {
    inputBuffer = fileOrBuffer;
  } else if (fileOrBuffer instanceof Uint8Array) {
    inputBuffer = Buffer.from(fileOrBuffer.buffer, fileOrBuffer.byteOffset, fileOrBuffer.byteLength);
  } else {
    inputBuffer = Buffer.from(fileOrBuffer);
  }

  const image = sharp(inputBuffer, { failOn: "none" });
  const metadata = await image.metadata();

  if (!metadata.format) {
    throw new Error("Invalid or unreadable image file format.");
  }

  // Preserve aspect ratio, only scale down if larger than MAX_LONGEST_SIDE, never upscale
  const resizeOptions: ResizeOptions = {
    width: MAX_LONGEST_SIDE,
    height: MAX_LONGEST_SIDE,
    fit: "inside",
    withoutEnlargement: true,
  };

  try {
    // Attempt AVIF with balanced effort: 2 (fast & memory-efficient)
    const processedBuffer = await image
      .rotate() // Auto-orient based on EXIF data
      .resize(resizeOptions)
      .avif({
        quality: AVIF_QUALITY,
        effort: 2,
        chromaSubsampling: "4:2:0",
      })
      .toBuffer();

    const finalMetadata = await sharp(processedBuffer).metadata();

    return {
      buffer: processedBuffer,
      width: finalMetadata.width,
      height: finalMetadata.height,
      format: "avif",
      sizeBytes: processedBuffer.byteLength,
    };
  } catch (avifError) {
    console.warn("[Image Processing Warning] AVIF conversion failed, falling back to WebP:", avifError);

    // Reliable fallback to WebP
    const fallbackBuffer = await sharp(inputBuffer, { failOn: "none" })
      .rotate()
      .resize(resizeOptions)
      .webp({
        quality: WEBP_QUALITY,
        effort: 3,
      })
      .toBuffer();

    const finalMetadata = await sharp(fallbackBuffer).metadata();

    return {
      buffer: fallbackBuffer,
      width: finalMetadata.width,
      height: finalMetadata.height,
      format: "webp",
      sizeBytes: fallbackBuffer.byteLength,
    };
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file || file.size === 0) {
    return { valid: false, error: "Please provide a valid image file." };
  }

  const mime = file.type ? file.type.toLowerCase().trim() : "";
  const name = file.name || "";

  const isMimeAllowed = mime && ALLOWED_MIME_TYPES.has(mime);
  const isExtensionAllowed = ALLOWED_EXTENSIONS.test(name);

  if (!isMimeAllowed && !isExtensionAllowed) {
    return {
      valid: false,
      error: `Unsupported file type (${mime || "unknown"}). Please upload JPG, PNG, WebP, or AVIF.`,
    };
  }

  // Max raw upload limit before compression: 25MB
  if (file.size > 25 * 1024 * 1024) {
    return {
      valid: false,
      error: "Original image exceeds 25MB limit. Please choose a smaller file.",
    };
  }

  return { valid: true };
}
