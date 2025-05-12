"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { processSalesData } from "@/utils/process-sales-data"
import { useEffect, useState } from "react"
import { parseCSV } from "@/utils/parse-csv"
import { MonthlyData } from "@domain/entities/Charts"

const chartConfig = {
  quantity: {
    label: "Quantity Sold",
    color: "#2563eb",
  },
  profit: {
    label: "Profit",
    color: "#10b981",
  },
} satisfies ChartConfig

export function SalesBarChart() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const salesData = await parseCSV('/sales.csv');
        const { monthlyData } = processSalesData(salesData) as { monthlyData: MonthlyData[] };
        setMonthlyData(monthlyData);
      } catch (error) {
        console.error('Error loading sales data:', error);
      }
    }

    loadData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Quantity and Profit by Month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {monthlyData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar 
                yAxisId="left"
                dataKey="quantity" 
                fill="var(--color-quantity)" 
                radius={4} 
              />
              <Bar 
                yAxisId="right"
                dataKey="profit" 
                fill="var(--color-profit)" 
                radius={4} 
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            Loading sales data...
          </div>
        )}
      </CardContent>
    </Card>
  )
}