"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/transaction-table"
import { TotalBalanceCard } from "@/components/total-balance-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { BudgetOverviewCard } from "@/components/budget-overview-card"
import { SpendingCard } from "@/components/spending-card"

export default function Page() {


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-1">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex w-full flex-row ">
                <TotalBalanceCard />
                <BudgetOverviewCard />
                <SpendingCard />
              </div>
              <div className="flex justify-between px-4 lg:px-6 lg:gap-4 :gap-2">
                <ChartAreaInteractive />
              </div>
              <DataTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
