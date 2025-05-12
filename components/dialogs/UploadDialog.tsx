'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadForm } from "@/components/forms/UploadForm";

interface Props {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  reloadDataAction: () => void;
}

export function UploadDialog({ open, onOpenChangeAction, reloadDataAction }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importar Produtos via CSV</DialogTitle>
        </DialogHeader>
        <UploadForm onSubmitSuccessAction={() => {
          reloadDataAction();
          onOpenChangeAction(false);
        }} />
      </DialogContent>
    </Dialog>
  );
}
