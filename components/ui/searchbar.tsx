import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <Field orientation="horizontal"  className="w-[40%]">
      <Input type="search" placeholder="Search for description..." />
      <Button>Search</Button>
    </Field>
  )
}
