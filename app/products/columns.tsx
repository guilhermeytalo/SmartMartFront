"use client"

import { Button } from "@components/ui/button"
import { Category } from "@domain/entities/Category"
import { Product } from "@domain/entities/Product"
import { Column, ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

interface ColumnsProps {
  categories: Category[]
}

export const createColumns = ({ categories }: ColumnsProps): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: ({ column }: { column: Column<Product, unknown> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: ({ column }: { column: Column<Product, unknown> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const price = parseFloat(row.getValue("price") as string);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "categoryId",
    header: ({ column }: { column: Column<Product, unknown> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc")
          }}>
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const categoryId = Number(row.getValue("categoryId"));
      const category = categories.find(cat => cat.id === categoryId);
      return <div>{category?.name || "Unknown"}</div>;
    },
    filterFn: (row: { getValue: (id: string) => unknown }, id: string, value: unknown) => {
      if (value === undefined || value === "all") return true;
      const rowValue = Number(row.getValue(id));
      return rowValue === Number(value);
    },
    meta: {
      categories
    }
  },
  {
    accessorKey: "brand",
    header: ({ column }: { column: Column<Product, unknown> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: "equals",
  },
  {
    accessorKey: "quantity",
    header: ({ column }: { column: Column<Product, unknown> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "profit",
    header: ({ column }: { column: Column<Product, unknown> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const profit = parseFloat(row.getValue("profit") as string);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  }
]
