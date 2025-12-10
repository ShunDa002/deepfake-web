/**
 * Custom hook for image URL validation
 */

const useImageValidation = () => {
  /**
   * Validates if a string is a valid HTTP/HTTPS URL
   */
  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  /**
   * Validates if a URL points to a valid image
   * Returns a promise that resolves to true if valid, false otherwise
   */
  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;

      // Set a timeout in case the image takes too long to load
      setTimeout(() => resolve(false), 10000);
    });
  };

  /**
   * Validates a URL in two stages:
   * 1. Checks if it's a valid URL format
   * 2. Checks if it points to a valid image
   * Returns an object with validation result and error message
   */
  const validateUrl = async (
    url: string
  ): Promise<{ isValid: boolean; errorMessage?: string }> => {
    if (!url.trim()) {
      return { isValid: false, errorMessage: "URL cannot be empty" };
    }

    const trimmedUrl = url.trim();

    // First check if it's a valid URL format
    if (!isValidUrl(trimmedUrl)) {
      return { isValid: false, errorMessage: "Not a valid URL" };
    }

    // Then check if it's a valid image URL
    const isImageValid = await validateImageUrl(trimmedUrl);

    if (!isImageValid) {
      return {
        isValid: false,
        errorMessage:
          "No image found at URL. Please make sure the URL points to a valid image.",
      };
    }

    return { isValid: true };
  };

  return {
    isValidUrl,
    validateImageUrl,
    validateUrl,
  };
};

export default useImageValidation;