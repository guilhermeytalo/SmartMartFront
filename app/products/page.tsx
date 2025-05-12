'use client';
import { useEffect, useState } from "react";

import { ProductDialog } from "@/components/dialogs/ProductDialog";
import { UploadDialog } from "@/components/dialogs/UploadDialog";
import { PaginationControls } from "@/components/table/PaginationControls";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { Product } from "@domain/entities/Product";
import { getData } from "@domain/services/ProductService";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => setOpenProductDialog(true)}>New Product</Button>
          <Button variant="outline" onClick={() => setOpenUploadDialog(true)}>Import CSV</Button>
        </div>
      </div>

      <>
        <DataTable columns={columns} data={data} isLoading={loading} />

        <div className="mt-4">
          <PaginationControls
            currentPage={page}
            totalPages={Math.max(1, Math.ceil(total / limit))}
            pageSize={limit}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
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
