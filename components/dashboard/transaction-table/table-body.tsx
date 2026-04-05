"use client"

import { flexRender, type Table, type ColumnDef } from "@tanstack/react-table"
import {
  Table as UITable,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { TableHeaderCell } from "./table-header-cell"

interface TransactionTableBodyProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData, any>[]
}

export function TransactionTableBody<TData>({
  table,
  columns,
}: TransactionTableBodyProps<TData>) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <UITable>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell key={header.id} header={header} />
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableHead colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableHead>
            </TableRow>
          )}
        </TableBody>
      </UITable>
    </div>
  )
}
