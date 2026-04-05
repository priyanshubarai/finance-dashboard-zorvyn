"use client"

import * as React from "react"
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SearchBar } from "@/components/ui/searchbar"
import { columns } from "./transaction-table/columns"
import { AddTransactionDialog } from "./transaction-table/add-transaction-dialog"
import { TransactionTableBody } from "./transaction-table/table-body"
import { TablePagination } from "./transaction-table/table-pagination"
import { useTransactionDataStore } from "@/lib/store/transactionDataStore"
import { useTransactionTableStore } from "@/lib/store/transactionTableStore"

export function DataTable() {
  const { transactionData: data } = useTransactionDataStore()
  const {
    sorting,
    columnFilters,
    pagination,
    searchQuery,
    setSorting,
    setColumnFilters,
    setPagination,
  } = useTransactionTableStore()

  React.useEffect(() => {
    setColumnFilters((old) => {
      const filters = Array.isArray(old)
        ? old.filter((f) => f.id !== "description")
        : []
      if (searchQuery) {
        filters.push({ id: "description", value: searchQuery })
      }
      return filters
    })
  }, [searchQuery, setColumnFilters])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination },
    initialState: {
      sorting: [{ id: "description", desc: false }],
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <Separator />
      <p className="mx-3 px-4 text-sm text-muted-foreground">
        Note: click on the column header to trigger sorting
      </p>

      {/* Toolbar */}
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <SearchBar />
        <div className="flex items-center gap-2">
          <AddTransactionDialog />
        </div>
      </div>

      {/* Table */}
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        {data.length ? (
          <>
          <TransactionTableBody table={table} columns={columns} />
          <TablePagination table={table} />
          </>
        ) : (
          <span className="font-medium text-muted-foreground">
            Data Not Available
          </span>
        )}
      </TabsContent>
    </Tabs>
  )
}
