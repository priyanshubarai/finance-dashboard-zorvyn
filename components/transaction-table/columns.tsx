"use client"

import * as React from "react"
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"
import { CircleCheckIcon, LoaderIcon, EllipsisVerticalIcon, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TableCell } from "@/components/ui/table"
import { TableCellViewer } from "./table-cell-viewer"
import {
  type transactionDataSchema,
  type transactionTableRowSchema,
} from "@/components/transaction-table/schema"
import { Pencil } from "lucide-react"
import { useTransactionDataStore } from "@/lib/store/transactionDataStore"

const columnHelper = createColumnHelper<transactionTableRowSchema>()

function ActionsCell({ row }: { row: { original: transactionTableRowSchema } }) {
  const { deleteTransaction } = useTransactionDataStore();
  return (
    <Button
      variant={"destructive"}
      onClick={(e) => { e.stopPropagation(); deleteTransaction(row.original.id); }}
    >
      <Trash className="w-4 h-4" />
    </Button>
  );
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
  }),

  columnHelper.accessor("description", {
    cell: (cell) => {
      return <span>{cell.getValue()}</span>
    },
  }),
  columnHelper.accessor("category", {
    cell: (cell) => {
      return <span>{cell.getValue()}</span>
    },
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
  }),
  columnHelper.accessor("amount", {
    cell: (cell) => {
      return <span>$ {cell.getValue()}</span>
    },
  }),
  {
    id: "actions",
    cell: ({ row }: { row: { original: transactionTableRowSchema } }) => <ActionsCell row={row} />,
  },
]

// export const columns: ColumnDef<transactionDataSchema>[] = [
//   // {
//   //   accessorKey: "header",
//   //   header: "Header",
//   //   cell: ({ row }) => {
//   //     return <TableCellViewer item={row.original} />
//   //   },
//   //   enableHiding: false,
//   // },
//   // {
//   //   accessorKey: "type",
//   //   header: "Section Type",
//   //   cell: ({ row }) => (
// <div className="w-32">
//   <Badge variant="outline" className="px-1.5 text-muted-foreground">
//     {row.original.type}
//   </Badge>
// </div>
//   //   ),
//   // },
//   // {
//   //   accessorKey: "status",
//   //   header: "Status",
//   //   cell: ({ row }) => (
//     <Badge variant="outline" className="px-1.5 text-muted-foreground">
//       {row.original.status === "Done" ? (
//         <CircleCheckIcon className="fill-green-500 dark:fill-green-400" />
//       ) : (
//         <LoaderIcon />
//       )}
//       {row.original.status}
//   //     </Badge>
//   //   ),
//   // },
//   // {
//   //   accessorKey: "target",
//   //   header: () => <div className="w-full text-right">Target</div>,
//   //   cell: ({ row }) => (
//   //     <form
//   //       onSubmit={(e) => {
//   //         e.preventDefault()
//   //         toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//   //           loading: `Saving ${row.original.header}`,
//   //           success: "Done",
//   //           error: "Error",
//   //         })
//   //       }}
//   //     >
//   //       <Label htmlFor={`${row.original.id}-target`} className="sr-only">
//   //         Target
//   //       </Label>
//   //       <Input
//   //         className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
//   //         defaultValue={row.original.target}
//   //         id={`${row.original.id}-target`}
//   //       />
//   //     </form>
//   //   ),
//   // },
//   // {
//   //   accessorKey: "limit",
//   //   header: () => <div className="w-full text-right">Limit</div>,
//   //   cell: ({ row }) => (
//   //     <form
//   //       onSubmit={(e) => {
//   //         e.preventDefault()
//   //         toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//   //           loading: `Saving ${row.original.header}`,
//   //           success: "Done",
//   //           error: "Error",
//   //         })
//   //       }}
//   //     >
//   //       <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
//   //         Limit
//   //       </Label>
//   //       <Input
//   //         className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
//   //         defaultValue={row.original.limit}
//   //         id={`${row.original.id}-limit`}
//   //       />
//   //     </form>
//   //   ),
//   // },
//   // {
//   //   accessorKey: "reviewer",
//   //   header: "Reviewer",
//   //   cell: ({ row }) => {
//   //     const isAssigned = row.original.reviewer !== "Assign reviewer"

//   //     if (isAssigned) {
//   //       return row.original.reviewer
//   //     }

//   //     return (
//   //       <>
//   //         <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
//   //           Reviewer
//   //         </Label>
//   //         <Select>
//   //           <SelectTrigger
//   //             className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
//   //             size="sm"
//   //             id={`${row.original.id}-reviewer`}
//   //           >
//   //             <SelectValue placeholder="Assign reviewer" />
//   //           </SelectTrigger>
//   //           <SelectContent align="end">
//   //             <SelectGroup>
//   //               <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
//   //               <SelectItem value="Jamik Tashpulatov">
//   //                 Jamik Tashpulatov
//   //               </SelectItem>
//   //             </SelectGroup>
//   //           </SelectContent>
//   //         </Select>
//   //       </>
//   //     )
//   //   },
//   // },

// ]
