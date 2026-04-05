import * as React from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTransactionTableStore } from "@/lib/store/transactionTableStore"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useTransactionTableStore()

  return (
    <Field orientation="horizontal" className="w-[40%]">
      <Input
        type="search"
        placeholder="Search for description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button className="cursor-default hover:bg-background">
        Search
      </Button>
    </Field>
  )
}
