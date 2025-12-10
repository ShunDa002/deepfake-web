import { ImageUp } from "lucide-react";
import { ReactNode } from "react";

interface UploadAreaProps {
  onDialogTrigger?: ReactNode;
}

const UploadArea = ({ onDialogTrigger }: UploadAreaProps) => {
  return (
    <label
      htmlFor="imgfile-input-image"
      id="upload-area"
      className="block cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 lg:p-12 min-h-[180px] lg:min-h-[280px] hover:border-primary hover:bg-accent/50 transition-all duration-200">
        <ImageUp className="w-12 h-12 lg:w-16 lg:h-16 text-muted-foreground mb-3 lg:mb-4" />
        <p className="text-base lg:text-lg font-semibold text-foreground mb-1.5 lg:mb-2">
          Upload an image
        </p>
        <div className="text-xs lg:text-sm text-muted-foreground mb-1.5 lg:mb-2">
          or enter a {onDialogTrigger}
        </div>
      </div>
    </label>
  );
};

export default UploadArea;
