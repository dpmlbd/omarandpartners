import sharp, { type ResizeOptions } from "sharp";

export interface ProcessedImageResult {
  buffer: Buffer;
  width?: number;
  height?: number;
  format: "avif";
  sizeBytes: number;
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_LONGEST_SIDE = 2400; // 2400px - 2560px standard for architectural photography
const AVIF_QUALITY = 80;

export async function processImageToAvif(
  fileOrBuffer: Buffer | ArrayBuffer | Uint8Array
): Promise<ProcessedImageResult> {
  let inputBuffer: Buffer;
  if (Buffer.isBuffer(fileOrBuffer)) {
    inputBuffer = fileOrBuffer;
  } else if (fileOrBuffer instanceof Uint8Array) {
    inputBuffer = Buffer.from(fileOrBuffer.buffer, fileOrBuffer.byteOffset, fileOrBuffer.byteLength);
  } else {
    inputBuffer = Buffer.from(fileOrBuffer);
  }

  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (!metadata.format) {
    throw new Error("Invalid or unreadable image file.");
  }

  // Preserve aspect ratio, only scale down if larger than MAX_LONGEST_SIDE, never upscale
  const resizeOptions: ResizeOptions = {
    width: MAX_LONGEST_SIDE,
    height: MAX_LONGEST_SIDE,
    fit: "inside",
    withoutEnlargement: true,
  };

  const processedBuffer = await image
    .rotate() // Auto-orient based on EXIF
    .resize(resizeOptions)
    .avif({
      quality: AVIF_QUALITY,
      effort: 4, // Balanced CPU effort vs compression for serverless
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
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file type (${file.type}). Please upload JPG, PNG, or WebP.`,
    };
  }

  // Max raw upload limit before compression: 15MB
  if (file.size > 15 * 1024 * 1024) {
    return {
      valid: false,
      error: "Original image exceeds 15MB limit. Please choose a smaller file.",
    };
  }

  return { valid: true };
}
