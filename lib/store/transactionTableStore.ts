import { create } from 'zustand'
import type { ColumnFiltersState, PaginationState, SortingState, Updater } from '@tanstack/react-table'

// Helper to handle TanStack Table's Updater pattern
function resolveUpdater<T>(updater: Updater<T>, old: T): T {
  return typeof updater === 'function' ? (updater as (old: T) => T)(old) : updater
}

export type TransactionFormState = {
  formDate: Date | undefined
  formDescription: string
  formCategory: string
  formType: 'expense' | 'income'
  formAmount: number | undefined
}

export type TransactionTableState = {
  // dialog
  isAddDialogOpen: boolean

  // form fields
  formDate: Date | undefined
  formDescription: string
  formCategory: string
  formType: 'expense' | 'income'
  formAmount: number | undefined

  // table state
  sorting: SortingState
  columnFilters: ColumnFiltersState
  pagination: {
    pageIndex: number
    pageSize: number
  }
  searchQuery: string
}

export type TransactionTableActions = {
  setIsAddDialogOpen: (open: boolean) => void

  // form setters
  setFormDate: (date: Date | undefined) => void
  setFormDescription: (description: string) => void
  setFormCategory: (category: string) => void
  setFormType: (type: 'expense' | 'income') => void
  setFormAmount: (amount: number | undefined) => void
  resetForm: () => void

  // table setters
  setSorting: (sorting: Updater<SortingState>) => void
  setColumnFilters: (filters: Updater<ColumnFiltersState>) => void
  setPagination: (pagination: Updater<PaginationState>) => void
  setSearchQuery: (query: string) => void
}

const initialFormState: TransactionFormState = {
  formDate: undefined,
  formDescription: '',
  formCategory: '',
  formType: 'expense',
  formAmount: undefined,
}

export const useTransactionTableStore = create<
  TransactionTableState & TransactionTableActions
>((set) => ({
  // dialog
  isAddDialogOpen: false,
  setIsAddDialogOpen: (open) => set({ isAddDialogOpen: open }),

  // form fields
  ...initialFormState,
  setFormDate: (formDate) => set({ formDate }),
  setFormDescription: (formDescription) => set({ formDescription }),
  setFormCategory: (formCategory) => set({ formCategory }),
  setFormType: (formType) => set({ formType }),
  setFormAmount: (formAmount) => set({ formAmount }),
  resetForm: () => set({ ...initialFormState }),

  // table state
  sorting: [],
  columnFilters: [],
  pagination: { pageIndex: 0, pageSize: 10 },
  searchQuery: '',
  setSorting: (updater) => set((state) => ({ sorting: resolveUpdater(updater, state.sorting) })),
  setColumnFilters: (updater) => set((state) => ({ columnFilters: resolveUpdater(updater, state.columnFilters) })),
  setPagination: (updater) => set((state) => ({ pagination: resolveUpdater(updater, state.pagination) })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
