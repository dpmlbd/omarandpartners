import type { ResizeOptions } from "sharp";

export interface ProcessedImageResult {
  buffer: Buffer;
  width?: number;
  height?: number;
  format: "avif" | "webp" | "png" | "jpeg" | "jpg";
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

function detectImageFormat(buffer: Buffer, mimeType?: string): "avif" | "webp" | "png" | "jpeg" {
  if (buffer.length >= 8) {
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      return "png";
    }
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return "jpeg";
    }
    if (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer.length >= 12 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    ) {
      return "webp";
    }
  }
  if (mimeType) {
    const clean = mimeType.toLowerCase();
    if (clean.includes("png")) return "png";
    if (clean.includes("webp")) return "webp";
    if (clean.includes("avif")) return "avif";
    if (clean.includes("jpeg") || clean.includes("jpg")) return "jpeg";
  }
  return "jpeg";
}

export async function processImageToAvif(
  fileOrBuffer: Buffer | ArrayBuffer | Uint8Array,
  fallbackMimeType?: string
): Promise<ProcessedImageResult> {
  let inputBuffer: Buffer;
  if (Buffer.isBuffer(fileOrBuffer)) {
    inputBuffer = fileOrBuffer;
  } else if (fileOrBuffer instanceof Uint8Array) {
    inputBuffer = Buffer.from(fileOrBuffer.buffer, fileOrBuffer.byteOffset, fileOrBuffer.byteLength);
  } else {
    inputBuffer = Buffer.from(fileOrBuffer);
  }

  try {
    const sharpModule = await import("sharp");
    const sharp = (sharpModule.default || sharpModule) as unknown as typeof import("sharp").default;

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
  } catch (nativeError) {
    const msg = nativeError instanceof Error ? nativeError.message : String(nativeError);
    console.warn(
      `[Image Processing Fallback] Sharp image processing unavailable on this environment (${msg}). Safely bypassing conversion to preserve upload.`
    );
    const format = detectImageFormat(inputBuffer, fallbackMimeType);
    return {
      buffer: inputBuffer,
      format,
      sizeBytes: inputBuffer.byteLength,
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
