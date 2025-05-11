'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "@/components/forms/ProductForm";

interface Props {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

export function ProductDialog({ open, onOpenChangeAction }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>
        <ProductForm onSubmitSuccessAction={() => onOpenChangeAction(false)} />
      </DialogContent>
    </Dialog>
  );
}
