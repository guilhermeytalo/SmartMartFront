"use client"

import { Product } from "@domain/entities/Product"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
    {
        accessorKey: "categoryId",
        header: "Categoria",
    },
    {
        accessorKey: "brand",
        header: "Marca",
    },
    {
        accessorKey: "quantity",
        header: "Quantidade",
    },
    {
        accessorKey: "profit",
        header: "Lucro",
    }
]
