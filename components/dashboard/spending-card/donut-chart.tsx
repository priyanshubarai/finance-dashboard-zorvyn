"use client"

import React, { useLayoutEffect, useRef } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import chartData from "@/database/category-data.json"

am4core.useTheme(am4themes_animated)

export function DonutChart() {
    const chartAndLegendContainer = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (!chartAndLegendContainer.current) return

        const chart = am4core.create(chartAndLegendContainer.current, am4charts.PieChart)
        chart.hiddenState.properties.opacity = 0

        chart.data = chartData;

        chart.radius = am4core.percent(60)
        chart.innerRadius = am4core.percent(40)
        chart.startAngle = 0
        chart.endAngle = 360

        const series = chart.series.push(new am4charts.PieSeries())
        series.dataFields.value = "value"
        series.dataFields.category = "category"
        // series.dataFields.radiusValue = "value"

        series.slices.template.cornerRadius = 10
        series.slices.template.innerCornerRadius = 7
        series.slices.template.draggable = false
        series.slices.template.inert = true
        series.alignLabels = false
        series.labels.template.maxWidth = 130;
        series.labels.template.wrap = true;
        series.labels.template.fontSize = 10;
        series.labels.template.text = "{category}";

        series.hiddenState.properties.startAngle = 90
        series.hiddenState.properties.endAngle = 90

        series.labels.template.fill = am4core.color("#888")
        series.ticks.template.stroke = am4core.color("#888")

        return () => {
            chart.dispose()
        }
    }, [])

    return (
        <div className="flex-[3] shrink-1 basis-[30%] px-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
            <Card className="@container/card h-full min-h-[400px]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                        Spending Categories
                    </CardTitle>
                    <CardDescription>Monthly Expenses Distribution</CardDescription>
                </CardHeader>
                <CardContent className="flex h-80 flex-col gap-3 py-1">
                    <div ref={chartAndLegendContainer} style={{ width: "100%", height: "100%" }} />
                </CardContent>
            </Card>
        </div>
    )
}
