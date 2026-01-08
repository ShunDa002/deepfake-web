/**
 * Compresses an image file to reduce its size for upload.
 * Uses canvas-based compression to maintain quality while reducing file size.
 *
 * @param file - The original image file to compress
 * @param maxSizeMB - Maximum file size in MB (default: 4MB to stay under Vercel's 4.5MB limit)
 * @param maxWidthOrHeight - Maximum width or height in pixels (default: 2048)
 * @param quality - Initial JPEG quality (0-1, default: 0.8)
 * @returns Promise<File> - The compressed image file
 */
export async function compressImage(
  file: File,
  maxSizeMB: number = 4,
  maxWidthOrHeight: number = 2048,
  quality: number = 0.8
): Promise<File> {
  // If file is already small enough, return as-is
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size <= maxSizeBytes) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;

        if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
          if (width > height) {
            height = (height / width) * maxWidthOrHeight;
            width = maxWidthOrHeight;
          } else {
            width = (width / height) * maxWidthOrHeight;
            height = maxWidthOrHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Draw the image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with quality adjustment
        const compressWithQuality = (currentQuality: number) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to compress image"));
                return;
              }

              // If still too large and quality can be reduced, try again
              if (blob.size > maxSizeBytes && currentQuality > 0.1) {
                compressWithQuality(currentQuality - 0.1);
                return;
              }

              // Create a new File from the blob
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });

              resolve(compressedFile);
            },
            "image/jpeg",
            currentQuality
          );
        };

        compressWithQuality(quality);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image for compression"));
    };

    // Load the image from file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read image file"));
    };
    reader.readAsDataURL(file);
  });
}
