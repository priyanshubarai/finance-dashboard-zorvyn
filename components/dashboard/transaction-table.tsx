"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Columns3Icon,
  ChevronDownIcon,
  PlusIcon,
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
  Calendar as CalendarIcon,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { type transactionDataSchema } from "./transaction-table/schema"
import { columns } from "./transaction-table/columns"
import { SearchBar } from "../ui/searchbar"
import { Field, FieldLabel, FieldGroup, FieldSet } from "../ui/field"
import { useTransactionDataStore } from "@/lib/store/transactionDataStore"

export function DataTable() {

  const { transactionData: data, addNewTransaction, deleteTransaction } = useTransactionDataStore();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [open, setOpen] = React.useState<boolean>(false)
  const [date, setDate] = React.useState<Date | undefined>()
  const [description, setDescription] = React.useState<string>("")
  const [category, setCategory] = React.useState<string>("")
  const [type, setType] = React.useState<"expense" | "income">("expense")
  const [amount, setAmount] = React.useState<number>()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    initialState: {
      sorting: [
        {
          id: 'description',
          desc: false,
        },
      ],
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

  const handleAddTransaction = () => {
    if (!date) {
      console.log("no date")
      return
    }
    const newTransaction: transactionDataSchema = {
      id: crypto.randomUUID().toString(),
      date: formatToYYYYMMDD(date),
      description: description,
      category: category,
      type: type,
      amount: amount || 0,
    }
    console.log("new transaction :", newTransaction)
    addNewTransaction(newTransaction);
    setOpen(false)
    return
  }

  const isFormValid = () => {
    return (
      date &&
      description.trim() !== "" &&
      category.trim() !== "" &&
      (type === "income" || type === "expense") &&
      amount !== undefined &&
      amount > 0
    )
  }

  function formatToYYYYMMDD(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <Separator />
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <SearchBar />
        <div className="flex items-center gap-2">
          {/* filtering */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3Icon data-icon="inline-start" />
                Filters
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-full">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined"
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                    >
                      {column.id}
                      {/* is or isnot */}
                      <Select defaultValue="is">
                        <SelectTrigger className="w-[60px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="is">is</SelectItem>
                            <SelectItem value="not">is not</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="w-[60px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="is">is</SelectItem>
                            <SelectItem value="not">is not</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sorting */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3Icon data-icon="inline-start" />
                Columns
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined")
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* add row */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="rounded outline-3">
              <PlusIcon />
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={(e) => { e.preventDefault(); handleAddTransaction() }}>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>Add New Transaction</DialogDescription>
                  {/* input fields */}
                  <FieldSet className="w-full">
                    <FieldGroup className="flex w-full flex-col justify-center">
                      <Field>
                        <FieldLabel htmlFor="date">Date</FieldLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              data-empty={!date}
                              className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                            >
                              <CalendarIcon />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              required
                            />
                          </PopoverContent>
                        </Popover>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="description">
                          Description
                        </FieldLabel>
                        <Input
                          id="description"
                          type="text"
                          placeholder="Ex. Office dinner"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Input
                          id="description"
                          type="text"
                          placeholder="Ex. Food"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="type">Type</FieldLabel>
                        <RadioGroup defaultValue={type}>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="income" id="income" />
                            <Label htmlFor="income">Income</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="expense" id="expense" />
                            <Label htmlFor="expense">Expense</Label>
                          </div>
                        </RadioGroup>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="amount">Amount</FieldLabel>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Ex. 255"
                          value={amount ?? ""}
                          onChange={(e) =>
                            setAmount(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          required
                        />
                      </Field>
                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-44 self-center"
                      >
                        Add Transaction
                      </Button>
                    </FieldGroup>
                  </FieldSet>
                </DialogHeader>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* table */}
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? 'cursor-pointer select-none flex items-center gap-2'
                                : '' 
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === 'asc'
                                  ? 'Sort ascending'
                                  : header.column.getNextSortingOrder() === 'desc'
                                    ? 'Sort descending'
                                    : 'Clear sort'
                                : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: <ArrowUp size={14}/>,
                              desc: <ArrowDown size={14}/>,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
              {/* {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))} */}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableHead
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableHead>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  )
}
