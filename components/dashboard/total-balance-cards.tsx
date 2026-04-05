import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export function TotalBalanceCard() {
  return (
    <div className="flex-[4] shring-1 basis-[40%] px-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $128,450.75
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex justify-between gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            includes this month`s revenue
          </div>
        </CardFooter>
        <div className="flex w-full flex-row gap-1.5 rounded-sm p-2">
          <ChildCard title={"Monthly Income"} amount={"42,300"} isUp={true} inpercent={"8.7"} insight={"sales needs attention"}/>
          <ChildCard title={"Monthly Expenses"} amount={"27,980"} isUp={false} inpercent={"4.6"} insight={"liabilities under control"}/>
          <ChildCard title={"Net Profit"} amount={"128,450.75"} isUp={true} inpercent={"18.2"} insight={"Income minus expenses"}/>
        </div>
      </Card>
    </div>
  )
}

function ChildCard({title,amount,isUp,inpercent,insight}: {title:string,amount:string,isUp:boolean,inpercent:string,insight:string}) {
  return (
    <div className="flex-1 px-0">
      <Card className="@container/card px-0">
        <CardHeader className="px-3">
          <CardDescription className="text-xs overflow-hidden">{title}</CardDescription>
          <CardTitle className="text-xl font-semibold overflow-hidden tabular-nums @[250px]/card:text-sm">
            ${amount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 px-3 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-xs">
            {isUp && <TrendingUpIcon className="size-6" />} 
            {!isUp && <TrendingDownIcon className="size-6" />}
            {inpercent}% vs last month  
          </div>
          <div className="text-muted-foreground">
            {insight}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

