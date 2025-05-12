'use client';
import { useEffect, useState } from "react";

import { ProductDialog } from "@/components/dialogs/ProductDialog";
import { UploadDialog } from "@/components/dialogs/UploadDialog";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/table/PaginationControls";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { Product } from "@domain/entities/Product";
import { mapApiProductToProduct } from "@domain/mappers/ProductMapper";

import { ProductRepository } from "@infra/http/repositories/ProductRepository";

async function getData(page: number, limit: number): Promise<{ products: Product[]; total: number }> {
  const repository = new ProductRepository();
  const response = await repository.findAll((page - 1) * limit, limit);

  if (!response.success || !response.data) {
    console.error("Error fetching products:", response.error);
    return { products: [], total: 0 };
  }

  return {
    products: response.data.items.map(mapApiProductToProduct) || [],
    total: response.data.total,
  };
}

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const reloadData = async (pageToLoad = page, pageSize = limit) => {
    setLoading(true);
    const { products, total } = await getData(pageToLoad, pageSize);
    setData(products);
    setTotal(total);
    setPage(pageToLoad);
    setLimit(pageSize);
    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    reloadData(newPage, limit);
  };

  const handlePageSizeChange = (newSize: number) => {
    reloadData(1, newSize);
  };

  useEffect(() => {
    reloadData(1);
  }, []);


  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-2">
        <Button onClick={() => setOpenProductDialog(true)}>New Product</Button>
        <Button variant="outline" onClick={() => setOpenUploadDialog(true)}>Importar CSV</Button>
      </div>

      <>
        <DataTable columns={columns} data={data} isLoading={loading} />
        
        <PaginationControls
          currentPage={page}
          totalPages={Math.max(1, Math.ceil(total / limit))}
          pageSize={limit}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </>

      <ProductDialog
        open={openProductDialog}
        onOpenChangeAction={(open) => {
          setOpenProductDialog(open);
          if (!open) reloadData();
        }}
      />
      <UploadDialog
        open={openUploadDialog}
        onOpenChangeAction={setOpenUploadDialog}
        reloadDataAction={() => reloadData(page)}
      />
    </div>
  );
}
