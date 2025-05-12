'use client';
import { useEffect, useState } from "react";

import { ProductDialog } from "@/components/dialogs/ProductDialog";
import { UploadDialog } from "@/components/dialogs/UploadDialog";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { Product } from "@domain/entities/Product";
import { mapApiProductToProduct } from "@domain/mappers/ProductMapper";

import { ProductRepository } from "@infra/http/repositories/ProductRepository";

async function getData(): Promise<Product[]> {
  const repositorie = new ProductRepository;
  const productsList = await repositorie.findAll();
  if (!productsList.success) {
    console.error("Error fetching products:", productsList.error);
    return [];
  }
  return productsList.data!.map(mapApiProductToProduct);
}

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const reloadData = async () => {
    setLoading(true);
    const products = await getData();
    setData(products);
    setLoading(false);
  };

  useEffect(() => {
    reloadData();
  }, []);


  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-2">
        <Button onClick={() => setOpenProductDialog(true)}>New Product</Button>
        <Button variant="outline" onClick={() => setOpenUploadDialog(true)}>Importar CSV</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}

      <ProductDialog open={openProductDialog}
        onOpenChangeAction={(open) => {
          setOpenProductDialog(open);
          if (!open) reloadData();
        }}
      />
      <UploadDialog 
        open={openUploadDialog} 
        onOpenChangeAction={setOpenUploadDialog} 
        reloadDataAction={reloadData} 
      />
    </div>
  );
}
