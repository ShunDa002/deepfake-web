import { X } from "lucide-react";

interface ImageDisplayProps {
  imageUrl: string;
  onClear: () => void;
}

const ImageDisplay = ({ imageUrl, onClear }: ImageDisplayProps) => {
  return (
    <div className="relative">
      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden flex items-center justify-center min-h-[340px] bg-gray-50 dark:bg-gray-900">
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-full h-full max-h-[340px] object-contain"
        />
      </div>
      {/* Circle X button on top-right corner */}
      <button
        onClick={onClear}
        className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 bg-gray-400 hover:bg-red-400 text-white rounded-full p-1.5 lg:p-2 shadow-lg transition-all duration-200 z-10"
        type="button"
        aria-label="Remove image"
      >
        <X className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
    </div>
  );
};

export default ImageDisplay;
