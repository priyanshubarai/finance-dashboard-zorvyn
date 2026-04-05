"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type transactionTableRowSchema } from "@/components/dashboard/transaction-table/schema"
import { useTransactionDataStore } from "@/lib/store/transactionDataStore"
import { Trash } from "lucide-react"

const columnHelper = createColumnHelper<transactionTableRowSchema>()

function ActionsCell({
  row,
}: {
  row: { original: transactionTableRowSchema }
}) {
  const { deleteTransaction } = useTransactionDataStore()
  return (
    <Button
      variant={"destructive"}
      onClick={(e) => {
        e.stopPropagation()
        deleteTransaction(row.original.id)
      }}
    >
      <Trash className="h-4 w-4" />
    </Button>
  )
}

export const columns = [
  columnHelper.accessor("date", {
    cell: (cell) => {
      const [year, month, day] = cell.getValue().split("-")
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    },
    header: "Date",
    sortingFn: "text",
  }),

  columnHelper.accessor("description", {
    cell: (cell) => {
      return <span>{cell.getValue()}</span>
    },
    header: "Description",
    sortingFn: "text",
  }),
  columnHelper.accessor("category", {
    cell: (cell) => {
      return <span>{cell.getValue()}</span>
    },
    header: "Category",
    sortingFn: "text",
  }),
  columnHelper.accessor("type", {
    cell: (cell) => {
      if (cell.getValue() === "income") {
        return (
          <div className="w-32">
            <Badge variant="secondary" className="px-1.5">
              {cell.getValue()}
            </Badge>
          </div>
        )
      }
      return (
        <div className="w-32">
          <Badge variant="destructive" className="px-1.5">
            {cell.getValue()}
          </Badge>
        </div>
      )
    },
    header: "Type",
    sortingFn: "text",
  }),
  columnHelper.accessor("amount", {
    cell: (cell) => {
      return <span>$ {cell.getValue()}</span>
    },
    header: "Amount",
    sortingFn: "text",
  }),
  {
    id: "actions",
    cell: ({ row }: { row: { original: transactionTableRowSchema } }) => (
      <ActionsCell row={row} />
    ),
  },
]
