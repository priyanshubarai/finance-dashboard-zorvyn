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
import { Button } from "./ui/button"
import { redirect } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export function BudgetOverviewCard() {
  return (
    <div className="flex-[3] shring-1 basis-[30%] px-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Budget Overview
          </CardTitle>
          <CardDescription>Track your budget Utilization</CardDescription>
          <CardAction>
            <Button variant={"link"} onClick={() => redirect("#")}>
              <Badge variant="outline">
                See all
                <ArrowUpRight className="size-4" />
              </Badge>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 overflow-y-scroll h-83 py-1">
          <BudgetCards
            title={"Marketing budget"}
            badgeText={"almost reached"}
            total={5000}
            current={4200}
          />
          <BudgetCards
            title={"Marketing budget"}
            badgeText={"almost reached"}
            total={5000}
            current={4200}
          />
          <BudgetCards
            title={"Marketing budget"}
            badgeText={"almost reached"}
            total={5000}
            current={4200}
          />
          
        </CardContent>
      </Card>
    </div>
  )
}

function BudgetCards({
  title,
  badgeText,
  total,
  current
}: {
  title: string,
  badgeText: string,
  total: number
  current: number

}) {
  return (
    <Card className="flex shrink-0 flex-col justify-center px-4 py-4 outline h-35">
      <div className="-my-1 flex justify-between">
        <CardDescription className="text-sm">{title}</CardDescription>
        <CardAction>
          <Badge className="bg-primary">{badgeText}</Badge>
        </CardAction>
      </div>
      <CardTitle>${current}/${total}</CardTitle>
      <Progress className="-my-3" value={(current / total) * 100} />
      <span className="text-xs font-light">{(current)/total * 100}% of budget used</span>
    </Card>
  )
}
