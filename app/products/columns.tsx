"use client"

import { Button } from "@components/ui/button"
import { Product } from "@domain/entities/Product"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CategoryType } from "@domain/entities/Category"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "categoryId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc")
          }}>
          Category
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const categoryId = row.getValue<number>("categoryId");
      return <div>{CategoryType[categoryId] || "Unknown"}</div>;
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "profit",
    header: "Profit",
  }
]
