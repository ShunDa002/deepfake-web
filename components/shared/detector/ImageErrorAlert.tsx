import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ImageErrorAlertProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

const ImageErrorAlert = ({
  isOpen,
  onOpenChange,
  message,
}: ImageErrorAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base lg:text-lg">
            Error
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs lg:text-sm">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="text-xs lg:text-sm">
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageErrorAlert;