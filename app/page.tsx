'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDialog } from "@/components/dialogs/ProductDialog";
import { UploadDialog } from "@/components/dialogs/UploadDialog";

export default function ProductsPage() {
  const [openProduct, setOpenProduct] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Button onClick={() => setOpenProduct(true)}>Novo Produto</Button>
        <Button variant="outline" onClick={() => setOpenUpload(true)}>Importar CSV</Button>
      </div>

      {/* Lista de produtos e filtros entrariam aqui */}

      <ProductDialog open={openProduct} onOpenChange={setOpenProduct} />
      <UploadDialog open={openUpload} onOpenChange={setOpenUpload} />
    </div>
  );
}
