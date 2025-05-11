'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "@/components/forms/ProductForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>
        <ProductForm onSubmitSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
