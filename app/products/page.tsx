'use client';
import { Button } from "@/components/ui/button";
import { ProductDialog } from "@/components/dialogs/ProductDialog";
import { UploadDialog } from "@/components/dialogs/UploadDialog";
import { useState } from "react";

export default function ProductsPage() {
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Button onClick={() => setOpenProductDialog(true)}>Novo Produto</Button>
        <Button variant="outline" onClick={() => setOpenUploadDialog(true)}>Importar CSV</Button>
      </div>

      {/* Aqui entraria a tabela e os filtros */}

      <ProductDialog open={openProductDialog} onOpenChange={setOpenProductDialog} />
      <UploadDialog open={openUploadDialog} onOpenChange={setOpenUploadDialog} />
    </div>
  );
}
