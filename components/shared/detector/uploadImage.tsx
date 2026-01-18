"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageDisplay from "./ImageDisplay";
import UploadArea from "./UploadArea";
import ImageUrlDialog from "./ImageUrlDialog";
import ImageErrorAlert from "./ImageErrorAlert";
import useImageValidation from "./useImageValidation";
import { detectImage } from "@/lib/actions/detector.actions";
import { compressImage } from "@/lib/utils/imageCompression";

const UploadImage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<"vit" | "siglip">("vit");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any | null>(null);

  const { validateUrl } = useImageValidation();

  const modelOptions = [
    {
      key: "siglip" as const,
      title: "SigLIP model",
    },
    {
      key: "vit" as const,
      title: "ViT model",
    },
  ];

  /**
   * Handles URL submission from the dialog
   */
  const handleUrlSubmit = async (url: string) => {
    const { isValid, errorMessage } = await validateUrl(url);

    if (isValid) {
      try {
        // Fetch the image and convert to File object
        const response = await fetch(url.trim());
        const blob = await response.blob();
        const fileName = url.split("/").pop() || "image.jpg";
        const file = new File([blob], fileName, { type: blob.type });

        setUploadedImage(url.trim());
        setImageFile(file);
        // console.log("Image URL:", url);
        setIsDialogOpen(false);
      } catch (error) {
        setAlertMessage("Failed to load image from URL");
        setIsDialogOpen(false);
        setIsAlertOpen(true);
      }
    } else {
      setAlertMessage(errorMessage || "Invalid URL");
      setIsDialogOpen(false);
      setIsAlertOpen(true);
    }
  };

  /**
   * Handles file upload from the file input
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the File object
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      // console.log("File selected:", file);
    }
  };

  /**
   * Clears the uploaded image and resets the file input
   */
  const handleClearImage = () => {
    setUploadedImage(null);
    setImageFile(null);
    setDetectionResult(null);
    // Reset the file input
    const fileInput = document.getElementById(
      "imgfile-input-image",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  /**
   * Handles image submission
   */
  const handleImageSubmit = async () => {
    if (uploadedImage && imageFile) {
      setIsSubmitting(true);
      // console.log("Submitting image:", uploadedImage);

      try {
        // Compress image if needed to stay under Vercel's 4.5MB limit
        const compressedFile = await compressImage(imageFile, 4, 2048, 0.8);
        // console.log(
        //   `Original: ${(imageFile.size / 1024 / 1024).toFixed(2)}MB, ` +
        //   `Compressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`
        // );

        const result = await detectImage(compressedFile, selectedModel);

        if (result.success) {
          // console.log("Detection successful:", result.data);
          // Store the detection result
          setDetectionResult(result.data);
        } else {
          console.error("Detection failed:", result.error);
          setAlertMessage(result.error || "Detection failed");
          setIsAlertOpen(true);
        }
      } catch (error) {
        console.error("Error submitting image:", error);
        setAlertMessage("Failed to process image");
        setIsAlertOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full max-w-sm lg:max-w-xl mx-auto px-4 lg:px-0">
      <h1 className="text-2xl lg:text-6xl font-bold text-center mb-2 mt-4 lg:mt-8">
        GuessWho{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #2e83fb, #bc63fb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Deepfake Detector
        </span>
      </h1>
      <p className="text-sm lg:text-base text-muted-foreground text-center mb-6">
        Detect deepfake in just 10s. Pick your model below, then upload an
        image—no sign-up needed.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
        {modelOptions.map((option) => {
          const isActive = selectedModel === option.key;
          return (
            <li
              key={option.key}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => setSelectedModel(option.key)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedModel(option.key);
                }
              }}
              className={`border rounded-lg p-3 lg:p-4 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 dark:focus:ring-offset-background ${
                isActive
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:border-primary/60 hover:bg-accent/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                <span className="text-sm lg:text-base font-semibold text-foreground">
                  {option.title}
                </span>
                <span
                  className={`text-[10px] lg:text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isActive ? "Selected" : "Tap to use"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {uploadedImage ? (
        <ImageDisplay imageUrl={uploadedImage} onClear={handleClearImage} />
      ) : (
        <UploadArea
          onDialogTrigger={
            <ImageUrlDialog
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onSubmit={handleUrlSubmit}
            />
          }
        />
      )}
      <div className="mt-4 lg:mt-6">
        <Button
          onClick={handleImageSubmit}
          disabled={!uploadedImage || isSubmitting}
          className="w-full text-sm lg:text-base py-2 lg:py-3"
          size="lg"
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </Button>
      </div>

      {detectionResult && (
        <div className="mt-4 p-4 bg-secondary rounded-lg space-y-3">
          <p className="text-center text-base lg:text-lg font-medium">
            Prediction probabilities
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md bg-background/60 border border-border p-3">
              <p className="text-xs uppercase text-muted-foreground">Fake</p>
              <p className="text-lg font-semibold text-red-400">
                {detectionResult.probabilities.fake.toFixed(2)}
              </p>
            </div>
            <div className="rounded-md bg-background/60 border border-border p-3">
              <p className="text-xs uppercase text-muted-foreground">Real</p>
              <p className="text-lg font-semibold text-green-400">
                {detectionResult.probabilities.real.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        id="imgfile-input-image"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      <ImageErrorAlert
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        message={alertMessage}
      />
    </div>
  );
};

export default UploadImage;
