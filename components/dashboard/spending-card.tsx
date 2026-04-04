"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Field, FieldLabel } from "@/components/ui/field"

export function SpendingCard() {
  return (
    <div className="flex-[3] shring-1 basis-[30%] px-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            Spendings By Categories
          </CardTitle>
          <CardDescription>Monthly Expenses Distribution</CardDescription>
          <CardAction>
            <Button variant={"link"} onClick={() => redirect("#")}>
              <Badge variant="outline">
                See all
                <ArrowUpRight className="size-4" />
              </Badge>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex h-83 flex-col gap-3 overflow-y-scroll py-1">
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
            <SpendingProgressCard title={"House Rent"} total={5000} current={4200}/>
        </CardContent>
      </Card>
    </div>
  )
}

function SpendingProgressCard({
  title,
  total,
  current,
}: {

  title: string
  total: number
  current: number
}) {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor={title}>
        <span>{title}</span>
        <span className="ml-auto">{(current/total)*100}%</span>
      </FieldLabel>
      <Progress value={(current/total)*100} id={title} />
    </Field>
  )
}
