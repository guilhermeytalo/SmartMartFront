'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadForm } from "@/components/forms/UploadForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importar Produtos via CSV</DialogTitle>
        </DialogHeader>
        <UploadForm onSubmitSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
