import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ImageUrlDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (url: string) => void;
}

const ImageUrlDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
}: ImageUrlDialogProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    onSubmit(imageUrl);
    setImageUrl("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-primary hover:underline cursor-pointer font-medium inline p-0 border-0 bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          URL
        </button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-base lg:text-lg">
            Enter Image URL
          </DialogTitle>
          <DialogDescription className="text-xs lg:text-sm">
            Please enter the URL of the image you want to upload.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 lg:space-y-4 py-3 lg:py-4">
          <div className="space-y-1.5 lg:space-y-2">
            <Label htmlFor="image-url" className="text-sm lg:text-base">
              Image URL
            </Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-sm lg:text-base"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className="text-xs lg:text-sm"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            type="button"
            className="text-xs lg:text-sm"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUrlDialog;