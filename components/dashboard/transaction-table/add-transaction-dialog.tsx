"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon, PlusIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup, FieldSet } from "@/components/ui/field"
import { useTransactionDataStore } from "@/lib/store/transactionDataStore"
import { useTransactionTableStore } from "@/lib/store/transactionTableStore"
import { type transactionDataSchema } from "./schema"
import { useRoleStore } from "@/lib/store/roleStore"

function formatToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function AddTransactionDialog() {
  const { role } = useRoleStore()
  const { addNewTransaction } = useTransactionDataStore()
  const {
    isAddDialogOpen,
    setIsAddDialogOpen,
    formDate,
    formDescription,
    formCategory,
    formType,
    formAmount,
    setFormDate,
    setFormDescription,
    setFormCategory,
    setFormType,
    setFormAmount,
    resetForm,
  } = useTransactionTableStore()

  const isFormValid = (): boolean => {
    return !!(
      formDate &&
      formDescription.trim() !== "" &&
      formCategory.trim() !== "" &&
      (formType === "income" || formType === "expense") &&
      formAmount !== undefined &&
      formAmount > 0
    )
  }

  const handleAddTransaction = () => {
    if (!formDate || role !== "admin") return

    const newTransaction: transactionDataSchema = {
      id: crypto.randomUUID().toString(),
      date: formatToYYYYMMDD(formDate),
      description: formDescription,
      category: formCategory,
      type: formType,
      amount: formAmount || 0,
    }

    addNewTransaction(newTransaction)
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleOpenChange = (open: boolean) => {
    setIsAddDialogOpen(open)
    if (!open) resetForm()
  }

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={handleOpenChange}>
      {role === "admin" && (<>
        <DialogTrigger className="flex gap-1 items-center flex-row rounded outline-3 p-1">
          <PlusIcon /> <span className="text-sm">Add Transaction</span>
        </DialogTrigger>
      </>)}
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddTransaction()
          }}
        >
          <DialogHeader>
            <DialogTitle />
            <DialogDescription>Add New Transaction</DialogDescription>
            <FieldSet className="w-full">
              <FieldGroup className="flex w-full flex-col justify-center">
                {/* Date */}
                <Field>
                  <FieldLabel htmlFor="date">Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!formDate}
                        className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        <CalendarIcon />
                        {formDate ? (
                          format(formDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formDate}
                        onSelect={setFormDate}
                        required
                      />
                    </PopoverContent>
                  </Popover>
                </Field>

                {/* Description */}
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Ex. Office dinner"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                  />
                </Field>

                {/* Category */}
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Input
                    id="category"
                    type="text"
                    placeholder="Ex. Food"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    required
                  />
                </Field>

                {/* Type */}
                <Field>
                  <FieldLabel htmlFor="type">Type</FieldLabel>
                  <RadioGroup
                    value={formType}
                    onValueChange={(val) =>
                      setFormType(val as "expense" | "income")
                    }
                  >
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

                {/* Amount */}
                <Field>
                  <FieldLabel htmlFor="amount">Amount</FieldLabel>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Ex. 255"
                    value={formAmount ?? ""}
                    onChange={(e) =>
                      setFormAmount(
                        e.target.value ? parseInt(e.target.value) : undefined
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
  )
}
