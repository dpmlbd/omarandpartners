/**
 * In-browser image compressor using HTML Canvas.
 * Prevents Vercel's 4.5MB Serverless Function payload limit (FUNCTION_PAYLOAD_TOO_LARGE)
 * and eliminates timeout issues during uploads.
 */
export async function compressImageForUpload(
  file: File,
  maxDimension = 2048,
  quality = 0.85
): Promise<File> {
  // If file is SVG or already small (< 400KB), return as-is
  if (file.type === "image/svg+xml" || file.size < 400 * 1024) {
    return file;
  }

  // Only compress standard image types
  if (!file.type.startsWith("image/")) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale down if larger than maxDimension
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(file);
            return;
          }

          // Preserve transparency for PNGs, white background for JPEGs
          if (file.type === "image/png") {
            ctx.clearRect(0, 0, width, height);
          } else {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Prefer WebP for high compression efficiency, fallback to JPEG
          const outputType =
            canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
              ? "image/webp"
              : "image/jpeg";

          canvas.toBlob(
            (blob) => {
              if (!blob || blob.size >= file.size) {
                // If compressed version is somehow not smaller, keep original
                resolve(file);
                return;
              }
              const extension = outputType === "image/webp" ? ".webp" : ".jpg";
              const newFileName = file.name.replace(/\.[^.]+$/, "") + extension;
              const compressedFile = new File([blob], newFileName, {
                type: outputType,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            outputType,
            quality
          );
        } catch (err) {
          console.warn("Client-side image compression fallback:", err);
          resolve(file);
        }
      };

      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
