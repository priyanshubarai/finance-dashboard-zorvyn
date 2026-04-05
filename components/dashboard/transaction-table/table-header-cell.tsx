"use client"

import * as React from "react"
import { flexRender, type Header } from "@tanstack/react-table"
import { ArrowUp, ArrowDown } from "lucide-react"
import { TableHead } from "@/components/ui/table"

interface TableHeaderCellProps<TData> {
  header: Header<TData, unknown>
}

export function TableHeaderCell<TData>({ header }: TableHeaderCellProps<TData>) {
  if (header.isPlaceholder) return <TableHead key={header.id} colSpan={header.colSpan} />

  const canSort = header.column.getCanSort()
  const sorted = header.column.getIsSorted()

  const nextSortTitle = canSort
    ? header.column.getNextSortingOrder() === "asc"
      ? "Sort ascending"
      : header.column.getNextSortingOrder() === "desc"
      ? "Sort descending"
      : "Clear sort"
    : undefined

  return (
    <TableHead key={header.id} colSpan={header.colSpan}>
      <div
        className={
          canSort ? "cursor-pointer select-none flex items-center gap-2" : ""
        }
        onClick={header.column.getToggleSortingHandler()}
        title={nextSortTitle}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{ asc: <ArrowUp size={14} />, desc: <ArrowDown size={14} /> }[
          sorted as string
        ] ?? null}
      </div>
    </TableHead>
  )
}
